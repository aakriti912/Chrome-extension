






// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  // If the action is to analyze the page
  if (request.action === "analyzePage") {
      // Get the active tab to access its content
      chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
          const activeTab = tabs[0];
          // Retrieve the content of the active tab
          const tabContent = await getContentFromTab(activeTab.id);
          if (tabContent) {
              // Analyze the content for scholarship-related information
              const isScholarshipPage = analyzePageForScholarships(tabContent);
              // Send message to the popup with the analysis result
              chrome.runtime.sendMessage({ isScholarshipPage: isScholarshipPage });
          } else {
              console.error("Error: Tab content is empty.");
          }
      });
  }
  if (request.action === 'sendDataToAPI') {
    // Make API call with request.data
    fetch('http://localhost:3000/extract_scholarship_content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add user's API key here. From secure storage
        'Authorization': 'Bearer sc_7yb394u923v8ucn928un3c4y23b9vy2938vy923bv8y49283y49'
      },
      body: JSON.stringify(request.data)
    })
    .then(response => response.json())
    .then(data => {
      // Send the specific key to the popup
      chrome.runtime.sendMessage({ action: 'updatePopup', data: data });
    })
    .catch(error => console.error('Error:', error));
  }
});

// Function to retrieve content from the active tab

async function getContentFromTab(tabId) {
  return new Promise((resolve, reject) => {
      chrome.tabs.get(tabId, (tab) => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              reject(chrome.runtime.lastError);
          } else {
              if ( tab.url.startsWith('https')) {
                  // Fetch the HTML content of the tab
                  fetch(tab.url)
                      .then(response => response.text())
                      .then(html => {
                          // Extract text content from the HTML using regular expressions
                          const textContent = extractTextFromHTML(html);
                          resolve(textContent);
                      })
                      .catch(error => {
                          console.error("Error fetching tab content:", error);
                          reject(error);
                      });
              } else {
                  console.error("Error: Not a valid URL.");
                  reject(new Error("Not a valid URL"));
              }
          }
      });
  });
}


// Function to extract text content from HTML using regular expressions
function extractTextFromHTML(html) {
  // Define regular expression to match text content
  const textRegex = /<[^>]*>/g; // Matches any HTML tags
  // Replace HTML tags with an empty string to extract text content
  return html.replace(textRegex, '');
}

// Function to analyze the content for scholarship-related information
function analyzePageForScholarships(textContent) {
  // Perform analysis based on keywords or patterns indicating scholarship-related information

  return /scholarship|grant|financial aid/i.test(textContent);
}










