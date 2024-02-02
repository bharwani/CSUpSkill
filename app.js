 /*    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('change', () => {
      body.classList.toggle('dark-Mode');
    });  */

  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const element1Value = document.getElementById('element1').value;
    const element2Value = document.getElementById('element2').value;
    const element3Value = document.getElementById('element3').value;

    if (!element1Value || !element2Value || !element3Value) {
      alert('Please fill out all form elements');
    } else {
      // You can add code here to submit the form data
      // For example: form.submit();
    }
  });

  // LD SDK Setup
// Set clientSideID to your LaunchDarkly client-side ID
const clientSideID = '65b7f5d2c99dfa109148cb62'; // Prod env
// What happens if you pass a Server-side or Mobile key? 

// Set up the context properties. This context should appear on your
// LaunchDarkly contexts dashboard soon after you run the demo.
const context = { "kind": "multi",
  "user": { "key": "user-key-123abc", "name": "Sandy" },
  "organization": { "key": "org-key-abc123" } 
}
console.log(context);

// Send debug messages to DevTools' Console; don't disrupt UX 
console.log('LD Client Initializing...');

if (clientSideID === '') {
  console.log('Missing clientSideID in app.js');
}

// Initialize LaunchDarkly SDK. Fetches flag playload. 
const ldClient = LDClient.initialize(clientSideID, context);
ldClient.on('initialized', () => {
  console.log('LD Client Initialized');
}); 

// Change background based on flag value
// Add ready listener to ldClient
console.log('Set up Ready listener');
ldClient.on('ready', () => {
  // Existing Feature: show/hide login dropdown 
  const loginFlagKey = 'login-control';
  const loginFlagValue = ldClient.variation(loginFlagKey, false);
  if (loginFlagKey) { // check if flag is true
    console.log('Login Flag Value: ' + loginFlagKey);
    document.getElementById('loginDropDown').style.display = 'inline';
  } else {
    document.getElementById('loginDropDown').style.display = 'none';
  }

  ldClient.flush();
});

// Close off LDClient
ldClient.flush();
ldClient.close();