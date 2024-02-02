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
const clientSideID = '';
// Set up the context properties. This context should appear on your
// LaunchDarkly contexts dashboard soon after you run the demo.
const context = { "kind": "multi",
  "user": { "key": "user-key-123abc", "name": "Sandy" },
  "organization": { "key": "org-key-abc123" } 
}
console.log(context);
// Send debug messages to DevTools' Console; don't disrupt UX 
console.log('LD Client Initializing...');
// Run a quick check for SDK key. 
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
  // Feature 1: 
  const flagKey = 'background-color';
  const flagValue = ldClient.variation(flagKey, '#ffffff');
  if (flagValue != '') { // check if FlagValue is not empty
    console.log('Background Color flag: ' + flagValue);
    document.body.style.backgroundColor = flagValue;
  }

  // Feature 2: show/hide login dropdown 
  const flagKey2 = 'login-control';
  const flagValue2 = ldClient.variation(flagKey2, false);
  if (flagValue2) { // check if flag is true
    console.log('Login Flag Value: ' + flagValue2);
    document.getElementById('loginDropDown').style.display = 'inline';
  } else {
    document.getElementById('loginDropDown').style.display = 'none';
  }

  // Feature 3: show/hide Meta login option; Prereq with feature 2 (flag=loginControl)
  const flagKey3 = 'meta-login-control';
  const flagValue3 = ldClient.variation(flagKey3, false);
  if (flagValue3) { // check if flag is true
    console.log('Meta Login Flag Value: ' + flagValue3);
    document.getElementsByClassName('dropdown-item')[2].style.display = 'inline';
  } else {
    document.getElementsByClassName('dropdown-item')[2].style.display = 'none';
  }

  ldClient.flush();
});

// TODO: Close off LDClient
ldClient.flush();
ldClient.close();