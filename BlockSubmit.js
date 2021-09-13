//Put in config file:
const STORAGE_KEY = "websites_blocked"
const DELIMITER = ","

document.addEventListener('DOMContentLoaded', () => {
    const btnSubmit = document.getElementById("submit");
    const btnShowBlocked = document.getElementById("showBlocked");
    const btnClearStorage = document.getElementById("clearStorage");
    const txtField = document.getElementById("websites");

    btnSubmit.addEventListener("click", () => {
        storeWebsites(txtField.value);
        txtField.value = "";
    }, false);
    btnShowBlocked.addEventListener("click", () => {
        const webBlockedList = getStoredWebsites(STORAGE_KEY);
        txtField.value = webBlockedList;
    });
    btnClearStorage.addEventListener("click", () => {
        chrome.storage.sync.clear();
    })
}, false);

const getStoredWebsites = async key => {
    let blockedWeb;
    try {
        await chrome.storage.sync.get(key, async res => {
            alert("Pair found: " + key + " : " + res[key]);
            blockedWeb = await res[key];
            alert("Blocked web: " + blockedWeb);
        })
        alert("Blocked web1: " + blockedWeb)
        return blockedWeb;
    } catch (e) {
        alert(e.name + "\n" + e.message + "\n" + e.stack);
        return "error";
    };
};

const getAllStorage = async () => {
    let allItems;
    await chrome.storage.sync.get(null, async items => {
        alert("All items: " + JSON.stringify(items))
        allItems = await items
    });
    return allItems;
};

const storeWebsites = async webString => {
    const storedVals = getAllStorage();
    let webToStore = "";
    let webList = webString.split("\n");
    let webListTrimmed = webList.map(item => item.trim());
    let allKeys = storedVals ? Object.keys(storedVals) : ["nothing found"];

    //Check if previous blocked website list exists and append to it
    if (allKeys.includes(STORAGE_KEY)) {
        const webVals = storedVals.STORAGE_KEY;
        let webValList = webVals.split(DELIMITER);
        let joinedWebList = [...new Set([...webValList, ...webListTrimmed])];
        alert("Joined List: " + joinedWebList)
        webToStore = joinedWebList.join(DELIMITER);
    } else {
        webToStore = webListTrimmed.join(DELIMITER);
    };

    //Store Websites
    let tempJson = {};
    tempJson[STORAGE_KEY] = webToStore;
    await chrome.storage.sync.set(tempJson, () => {
        alert(`Saved data with key: ${STORAGE_KEY} and value: ${webToStore}`)
    })
};