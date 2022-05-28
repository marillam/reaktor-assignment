
export const parse = (string) => {
    const s = string;

    //map for checking which optionals are included
    const includedPackages = new Set();

    const array = [];

    const lines = s.split("\n");

    let i = 0;

    const alphabeticalSortName = (a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if(aName < bName) {
          return -1;
        }
        if(aName > bName) {
          return 1;
        }
        return 0;
    }

    const alphabeticalSort = (a, b) => {
        const aName = a.toLowerCase();
        const bName = b.toLowerCase();
        if(aName < bName) {
          return -1;
        }
        if(aName > bName) {
          return 1;
        }
        return 0;
    }

    const nextLine = () => {
        return lines[i].trim();
    }

    const cleanString = (str) => {
        let value = str.trim();
        return value.replace(/["]+/g, '');
    }

    const parseDependencies = (str, includeIn, includeInOptional) => {
        let [innerKey, ...rest] = str.split("=");
        if(rest.length !== 0) {
            innerKey = innerKey.trim();
            if(rest.join('=').includes('optional = true')) {    //does not allow extra whitespace
                includeInOptional.push(innerKey);
            } else {
                includeIn.push(innerKey);
            }
        }
    }

    const parseExtras = (str, includeIn) => {
        let [, ...rest] = str.split("=");
        if(rest.length !== 0) {
            rest = rest.join('=')
            rest = rest.trim();
            rest = rest.replace(/^\[(.+(?=\]$))\]$/, '$1');
            rest = rest.replace(/\(([^\)]+(?=\)))\)/g, '');
            rest = rest.replace(/["]+/g, '');
            rest = rest.split(',');
            rest.forEach(pack => {
                const name = pack.trim();
                if(!includeIn.includes(name)) {
                    includeIn.push(name);
                }
            });
        }
    }


    while(i < lines.length) {
        const line = lines[i].trim();

        if(line === '[[package]]') {
            const newPackage = {
                name: '',
                description: '',
                dependencies: [],
                optionalDependencies: [],
                reverseDependencies: []
            }
            i += 1;
            let newLine = nextLine();
            while(newLine !== '[[package]]' && i < lines.length) {
                let [key, value] = newLine.split("=");
                value ? value = cleanString(value) : value = value;
                switch (key.trim()) {
                    case 'name':
                        newPackage.name = value;
                        includedPackages.add(value);
                        i += 1;
                        break;
                    case 'description':
                        newPackage.description = value;
                        i += 1;
                        break;
                    case '[package.dependencies]':
                        i += 1;
                        newLine = nextLine();
                        while(newLine[0] !== '[' && i < lines.length) {
                            parseDependencies(newLine, newPackage.dependencies, newPackage.optionalDependencies);   
                            i += 1;
                            if(i < lines.length) 
                                newLine = nextLine();
                        }
                        break;
                    case '[package.extras]':
                        i += 1;
                        newLine = nextLine();
                        while(newLine[0] !== '[' && i < lines.length) {
                            parseExtras(newLine, newPackage.optionalDependencies);
                            i += 1;
                            if(i < lines.length) 
                                newLine = nextLine();
                        }
                        break;
                    default:
                        i += 1;
                        break;
                }
                if(i < lines.length) 
                    newLine = nextLine();
            }
            array.push(newPackage);

        } else {
            i += 1;
        }
    }

    array.forEach(p => {
        // search which optional dependencies are included
        const odWithInclusion = p.optionalDependencies.map(op => {
            return { name: op, included: includedPackages.has(op) }
        });
        p.optionalDependencies = odWithInclusion;


        /*p.dependencies.forEach(pa => {
            if(!includedPackages.has(pa)) {
                count += 1;
                console.log(pa)
            }
        });*/
        

        // search reverse dependencies
        array.forEach(otherps => {
            //will also check itself but that doesn't cause any harm here so chose not to do extra comparisons
            otherps.dependencies.forEach(d => {
                if(d === p.name) {
                    p.reverseDependencies.push(otherps.name);
                }
            });
            otherps.optionalDependencies.forEach(od => {
                if(od.name === p.name) {
                    p.reverseDependencies.push(otherps.name);
                }
            });
        });

        // alphabetical orders for dependencies
        p.dependencies.sort(alphabeticalSort);
        p.optionalDependencies.sort(alphabeticalSortName);
        p.reverseDependencies.sort(alphabeticalSort);
    });

    // alphabetical orders for packages
    array.sort(alphabeticalSortName);

    return array;

};