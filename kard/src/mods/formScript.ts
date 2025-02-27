export const fillUpForm = async (id: string, password: string, f1: string, f2: string, btn: string) => {
    const [tab] = await chrome.tabs.query({ active: true });

    if (!tab?.id) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (id: string, password: string, f1: string, f2: string, btn: string) => {
            function simulateTyping(inputField: HTMLInputElement, value: string, callback: () => void) {
                let i = 0;
                inputField.focus();
                const interval = setInterval(() => {
                    inputField.value += value[i];

                    inputField.dispatchEvent(new Event("input", { bubbles: true }));
                    inputField.dispatchEvent(new Event("change", { bubbles: true }));

                    i++;
                    if (i === value.length) {
                        clearInterval(interval);
                        callback();
                    }
                }, 100);
            }

            const usernameField = document.getElementsByName(f1)[0] as HTMLInputElement | null;
            const passwordField = document.getElementsByName(f2)[0] as HTMLInputElement | null;

            if (usernameField && passwordField && !usernameField.value && !passwordField.value) {
                simulateTyping(usernameField, id, () => {
                    simulateTyping(passwordField, password, () => { });
                    const loginButton = document.querySelector(btn) as HTMLButtonElement | null;
                    if (loginButton) {
                        setTimeout(() => {
                            loginButton.click();
                            console.log("Done")
                        }, 1000);


                    } else {
                        console.error("Login button not found");
                    }

                });
            }
        },
        args: [id, password, f1, f2, btn]
    });
};