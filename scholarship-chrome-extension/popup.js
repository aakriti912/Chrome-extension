chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updatePopup') {
    console.log("Received data from background service worker")
    document.getElementById('analyzeBtn').innerHTML = "Check Eligibility"

    const result = message.data;
    const scholarshipAnalysisResult = document.getElementById('scholarshipAnalysisResult');

    if (result.qualified) {
      scholarshipAnalysisResult.textContent = result.message;
      scholarshipAnalysisResult.style.color = "green";
    } else {
      scholarshipAnalysisResult.textContent = result.message;
      scholarshipAnalysisResult.style.color = "red";
      scholarshipAnalysisResult.style.text_align = "left";

      const reasonsList = document.createElement('ul');
      reasonsList.setAttribute('id', 'reasonsList');

      result.reasons.forEach(reason => {
        const listItem = document.createElement('li');
        listItem.textContent = reason;
        reasonsList.appendChild(listItem);
      });

      const reasonsSection = document.createElement('div');
      reasonsSection.setAttribute('id', 'reasonsSection');
      reasonsSection.innerHTML = "<h3>Why you may not qualify:</h3>";
      reasonsSection.appendChild(reasonsList);

      scholarshipAnalysisResult.appendChild(reasonsSection);
    }
  }
});

// Event listener for the analyzeBtn button click
document.getElementById('analyzeBtn').addEventListener('click', async () => {
  document.getElementById('analyzeBtn').innerHTML = "Analyzing..."
  // Send message to service worker
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sendAnalysisRequest
  });
});

function sendAnalysisRequest() {
  // Extract DOM content
  const domContent = document.documentElement.outerHTML;
  // Extract page URL
  const pageUrl = window.location.href;

  // Create an object with DOM content, page URL, and any other relevant details
  const dataToSend = {
    dom_content: domContent,
    url: pageUrl,
    // Add other relevant details here
  };

  // Send message to service worker
  chrome.runtime.sendMessage({ action: 'sendDataToAPI', data: dataToSend });
}





function analyzePage() {
  chrome.runtime.sendMessage({ action: "analyzePage" });
}

// Function to update the analysis result in the popup
function updateAnalysisResult(isScholarshipPage) {
  const resultElement = document.getElementById("result");
  if (isScholarshipPage) {
      resultElement.textContent = "This page seems to be related to scholarships.";
  } else {
      resultElement.textContent = "Go to the webpage with scholarship and click the button below";
  }
}

// When popup is loaded, add click event listener to the analyze button
document.addEventListener("DOMContentLoaded", function() {
analyzePage();
});

// Listen for message from background script with analysis result
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.isScholarshipPage !== undefined) {
      updateAnalysisResult(request.isScholarshipPage);
  }
});



function analyzePage() {
  chrome.runtime.sendMessage({ action: "analyzePage" });
}

// Function to update the analysis result in the popup
function updateAnalysisResult(isScholarshipPage) {
  const resultElement = document.getElementById("result");
  if (isScholarshipPage) {
      resultElement.textContent = "This page seems to be related to scholarships.";
  } else {
      resultElement.textContent = "Go to the webpage with scholarship and click the button below";
  }
}

// When popup is loaded, add click event listener to the analyze button
document.addEventListener("DOMContentLoaded", function() {
analyzePage();
});

// Listen for message from background script with analysis result
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.isScholarshipPage !== undefined) {
      updateAnalysisResult(request.isScholarshipPage);
  }
});



