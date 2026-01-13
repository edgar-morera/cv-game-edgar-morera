export function displayDialogue(texts, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const navButtons = document.getElementsByClassName("nav-button");

    const dialogue = document.getElementById("dialogue");

    dialogueUI.style.display = "block";

    let currentTextIndex = 0;
    let text = texts[currentTextIndex];
    let textCount = texts.length;

    const intervalRef = printDialogue(text);
    
    const closeBtn = document.getElementById("close");

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick);

        for (var button of navButtons) {
            button.style.display = "none";
            button.removeEventListener("click", onNavBtnClick);
        }
    }

    closeBtn.addEventListener("click", onCloseBtnClick);

    function onNavBtnClick() {
        var doChange = false;

        if (this.classList.contains("ui-next-button") && (currentTextIndex + 1) < textCount) {
            currentTextIndex++;
            doChange = true;
        }
        else if (this.classList.contains("ui-prev-button") && currentTextIndex > 0) {
            currentTextIndex--;
            doChange = true;
        }

        if (doChange) {
            dialogue.innerHTML = "";
            printDialogue(texts[currentTextIndex]);
        }
    }

    
    for (var button of navButtons) {
        if (textCount > 1) {
            button.style.display = "inline-block";
            button.addEventListener("click", onNavBtnClick);
        }
        else {
            button.style.display = "none";
            button.removeEventListener("click", onNavBtnClick);
        }
    }
}

function printDialogue(text) {
    let index = 0;
    let currentText = "";

    return setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }

        clearInterval(this);
    }, 5);
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    const textBox = document.getElementById("textbox");
    const textNoteBox = document.getElementsByClassName("note")[0];

    if (resizeFactor < 1) {
        
        textBox.style['font-size'] = "0.65em";
        textBox.style['left'] = "2%";
        textBox.style['right'] = "2%";
        textNoteBox.style['font-size'] = "0.8em";
        textNoteBox.style['max-width'] = "80%";
        k.camScale(k.vec2(0.7));
        return;
    }

    k.camScale(k.vec2(1));
    textBox.style['font-size'] = "0.8em";    
}

function initScreenEvents($e) {
    var startBox = document.getElementById("start-box");
    var menu = document.getElementById("init-menu");
    var app = document.getElementById("app");
    
    if (window.getComputedStyle(app).display == 'none') {
        app.style.display = "block";
        startBox.style.display = "none";
        document.removeEventListener("click", initScreenEvents);
    }
}

export function initScreen(k) {
    const menuItems = document.querySelectorAll('#init-menu li');
    const playButtons = document.querySelectorAll('.play-music');
    k.loadSound("init", "./init-song.mp3");

    let music = false;
    let text = "Música ON/<strong>OFF</strong>";

    function toggleMusicPlay() {
        if (music === false) {
            music = k.play("init", {
                volume: 0.8,
                loop: true
            });

            text = "Música <strong>ON</strong>/OFF";
        }
        else {
            music.stop();
            music = false;

            text = "Música ON/<strong>OFF</strong>";
        }

        playButtons.forEach(function(item) {
            item.innerHTML = text;
        });
    }

    playButtons.forEach(function(item) {
        item.addEventListener("click", toggleMusicPlay);
    });

    
    playButtons.forEach(function(item) {
        item.innerHTML = text;
    });

    menuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
        
            var action = item.getAttribute('data-action');
            var startBox = document.getElementById("start-box");
            var app = document.getElementById("app");
        
            if (action === "start") {
                app.style.display = "block";
                startBox.style.display = "none";
                document.removeEventListener("click", initScreen);
            } 
            else if (action === "download") {
                var src = item.getAttribute('data-src');
                
                if (src) {
                    window.location.href = src;
                }
            }
        });
    });

}