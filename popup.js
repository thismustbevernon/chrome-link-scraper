let scrapeEmails = document.getElementById("scrapeEmails");

scrapeEmails.addEventListener("click", async () => {
  //alert("hello");
  //get current tab of our window
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    //func: scrapeEmailsFromPage,
    func: scrapeLinksFromPage,
  });
});

//function to scrape emails

// function scrapeEmailsFromPage() {
//   //RegEx to parse emails from html code:

//   const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

//   //parse emails from the html of that page:
//   let emails = document.body.innerHTML.match(emailRegEx);

//   alert(emails);
// }

function scrapeLinksFromPage() {
  //const linkRegEx = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
  const linkRegEx = /(https?:\/\/[^\s]+)/gi;

  //parse emails from the html of that page:
  let emails = document.body.innerHTML.match(linkRegEx);

  alert(emails);

  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emails),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.log("ERROR");
    });
}
