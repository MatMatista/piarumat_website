document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Blocca l'invio standard del browser

    const form = e.target;
    const resultBox = document.getElementById('form-result');
    
    // 1. Recuperiamo i valori scelti dall'utente
    const tagSelezionato = document.getElementById('categoria').value; // Es: "[Bug Report]"
    const oggettoUtente = document.getElementById('oggetto-utente').value; // Es: "Errore plugin"
    
    // 2. Uniamo il Tag con l'Oggetto nel campo nascosto richiesto da Web3Forms
    const oggettoFinale = `${tagSelezionato} ${oggettoUtente}`; 
    document.getElementById('hidden-subject').value = oggettoFinale;

    // Cambiamo temporaneamente il testo del bottone per mostrare il caricamento
    const btn = form.querySelector('.bottone-invia');
    btn.textContent = "Invio in corso...";
    btn.disabled = true;

    // 3. Prepariamo i dati da inviare a Web3Forms
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    resultBox.className = "form-result"; // Resetta le classi
    resultBox.textContent = "Attendi...";
    resultBox.style.display = "block";

    // 4. Spediamo i dati tramite API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
            // Successo!
            resultBox.classList.add('success');
            resultBox.textContent = "Messaggio inviato con successo! Ti risponderò al più presto.";
            form.reset(); // Svuota i campi del form
        } else {
            // Errore dal server
            resultBox.classList.add('error');
            resultBox.textContent = res.message || "Si è verificato un errore.";
        }
    })
    .catch(error => {
        // Errore di rete
        resultBox.classList.add('error');
        resultBox.textContent = "Errore di connessione. Riprova più tardi.";
    })
    .then(() => {
        // Ripristiniamo il bottone
        btn.textContent = "Invia Messaggio";
        btn.disabled = false;
    });
});