const bottone = document.getElementById('bottone-copia');

// Aggiungiamo la "e" (l'evento del click) dentro le parentesi
bottone.addEventListener('click', (e) => {
    e.preventDefault(); // Impedisce al link di ricaricare la pagina o fare scherzi
    
    navigator.clipboard.writeText("hyper-mc.it")
        .then(() => {
            alert("IP copiato negli appunti");
        })
        .catch(err => {
            console.error("Errore durante la copia: ", err);
        });
});
