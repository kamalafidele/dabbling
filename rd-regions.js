const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');
const axios = require('axios');

console.log(Provinces());
// console.log(Sectors("Kigali", 'Gasabo'));
// console.log(Cells("Kigali", "Gasabo", "Kimironko"));
// console.log(Villages("Kigali", "Gasabo", "Kimironko", "Nyagatovu"));


async function createRegions(type, parentName, parentId = null) {
  const districts = Districts(parentName);
  const sectors = Sectors("Kigali", 'Gasabo');
  const cells = Cells("Kigali", "Gasabo", "Kimironko");
  const villages = Villages("Kigali", "Gasabo", "Kimironko", "Nyagatovu");

  try {
    let requestData = [];
    if (type == 'PROVINCE') {
        const provinces = Provinces();
        requestData = provinces.map(province => {
            return {
                name: province,
                type: type,
                code: null,
                parentId,
            }
        });
    }
    if (type == 'DISTRICT') {
        requestData = districts.map(district => {
            return {
                name: district,
                type: type,
                parentId
            }
        });
    }
    if (type == 'SECTOR') {
        requestData = sectors.map(sector => {
            return {
                name: sector,
                type: type
            }
        });
    }

    console.log(requestData);
    const response = await axios.post('http://localhost:8080/api/locations/bulk-create', { locations: requestData });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// createRegions('DISTRICT', 'West', '8f641409-b0e6-47fb-9c20-ccc09be1fb60');