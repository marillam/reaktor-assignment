
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
            if(rest.join('=').includes('optional = true')) {            //does not allow extra whitespace here 
                includeInOptional.push(innerKey.toLowerCase());         // a check to make sure no dependencies aren't found because of letter size
            } else {
                includeIn.push(innerKey.toLowerCase());                 // a check to make sure no dependencies aren't found because of letter size
            }
        }
    }

    const parseExtras = (str, includeIn) => {
        let [, ...rest] = str.split("=");
        if(rest.length !== 0) {
            rest = rest.join('=')
            rest = rest.trim();
            rest = rest.replace(/^\[(.+(?=\]$))\]$/, '$1');         // gets rid of the outer []
            rest = rest.replace(/\(([^)]+(?=\)))\)/g, '');         // deletes the version numbers by replacing everything between () with nothing
            rest = rest.replace(/["]+/g, '');                       // gets rid of the "" around the names
            rest = rest.split(',');                                 // separates the packages
            rest.forEach(pack => {
                const name = pack.trim();
                if(!includeIn.includes(name)) {
                    includeIn.push(name.toLowerCase());             // a check to make sure no dependencies aren't found because of letter size
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
                let [key, v] = newLine.split("=");
                let value;
                v ? value = cleanString(v) : value = v;
                switch (key.trim()) {
                    case 'name':
                        newPackage.name = value.toLowerCase();                              // a check to make sure no dependencies aren't found because of letter size
                        includedPackages.add(value.toLowerCase());
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
        const odWithInclusion = p.optionalDependencies.map(od => {
            const odWithoutInner = od.replace(/\[([^\]]+(?=\]))\]/g, '');                      // makes optional dependencies like coverage[toml] point to coverage
            return { name: od, included: includedPackages.has(odWithoutInner), link: odWithoutInner }
        });
        p.optionalDependencies = odWithInclusion;


        const checkedDependencies = p.dependencies.map(d => {
            const dWithoutInner = d.replace(/\[([^\]]+(?=\]))\]/g, '');                      // same as above to make the code more resilient to changes in format, in case this is possible but just didn't appear in the file I used
            return { name: d, included: includedPackages.has(dWithoutInner), link: dWithoutInner }
        });
        p.dependencies = checkedDependencies;

        // search reverse dependencies
        array.forEach(otherPack => {
            //will also check itself but that doesn't cause any harm here so chose not to do extra comparisons
            otherPack.dependencies.forEach(d => {
                if(d === p.name) {
                    p.reverseDependencies.push(otherPack.name);
                }
            });
            otherPack.optionalDependencies.forEach(od => {
                if(od.name === p.name) {
                    p.reverseDependencies.push(otherPack.name);
                }
            });
        });

        // alphabetical orders for dependencies
        p.dependencies.sort(alphabeticalSortName);
        p.optionalDependencies.sort(alphabeticalSortName);
        p.reverseDependencies.sort(alphabeticalSort);
    });

    // alphabetical orders for packages
    array.sort(alphabeticalSortName);

    return array;

};