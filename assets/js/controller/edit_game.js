export function fillGame(results) {  
    const inputMapping = [
      { id: 'gamename', path: 'name' },
      { id: 'devname', path: 'dev_name.name' },
      { id: 'genre', path: 'genre' },
      { id: 'rating', path: 'rating' },
      { id: 'logo', path: 'game_logo' },
      { id: 'banner', path: 'game_banner' },
      { id: 'preview', path: 'preview' },
      { id: 'gamelinks', path: 'link_games' },
      { id: 'aboutgame', path: 'desc' },
      { id: 'aboutdevs', path: 'dev_name.bio' },
    ];
  
    inputMapping.forEach(({ id, path, index, property }) => {
      const inputElement = document.getElementById(id);
      const value = getNestedValue(results, path, index, property);
      inputElement.value = value;
    });
}
  
function getNestedValue(obj, path, index, property) {
    const value = path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);
    // console.log(`Value at path ${path}:`, value);
  
    if (Array.isArray(value) && value.length > index && value[index].hasOwnProperty(property)) {
      return value[index][property];
    }
  
    return value;
}