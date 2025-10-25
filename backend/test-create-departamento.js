(async ()=>{
  try {
    const query = `mutation { createDepartamento(input:{nombre:"Recursos Humanos", slogan:"Gestión del talento"}){ _id nombre slogan } }`;
    const res = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const text = await res.text();
    console.log('status', res.status);
    console.log(text);
  } catch (e) {
    console.error('ERR', e.message);
  }
})();
