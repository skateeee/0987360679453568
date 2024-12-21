document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    const chapterTimeInput = document.getElementById("chapterTime");
    const chapterNameInput = document.getElementById("chapterName");
    const addChapterButton = document.getElementById("addChapter");
    const gracePeriodInput = document.getElementById("gracePeriod");
    const defaultChapterList = document.getElementById("defaultChapterList");
    const customChapterList = document.getElementById("customChapterList");
    const defaultChapters = [
        { time: 0, name: "Start" },
        { time: 19, name: "Moving to Block 1" },
        { time: 27, name: "Block 1 start" },
        { time: 57, name: "Intersection start" },
        { time: 81, name: "Moving circle start" },
        { time: 121.5, name: "Split line start" },
        { time: 153.5, name: "Partner circle" },
        { time: 163.5, name: "Drag block (ending)" },
    ];
    const customChapters = [];
    function initializeChapters() {
        updateChapterList(defaultChapters, defaultChapterList);
        updateChapterList(customChapters, customChapterList);
    }
    addChapterButton.addEventListener("click", () => {
        const chapterTime = parseFloat(chapterTimeInput.value);
        const chapterName = chapterNameInput.value.trim();

        if (!isNaN(chapterTime) && chapterTime >= 0 && chapterName) {
            customChapters.push({ time: chapterTime, name: chapterName });
            updateChapterList(customChapters, customChapterList);
            chapterTimeInput.value = "";
            chapterNameInput.value = "";
        } else {
            alert("Please enter a valid time and chapter name.");
        }
    });
    function updateChapterList(chapters, listElement) {
        listElement.innerHTML = "";
        chapters.sort((a, b) => a.time - b.time);
        chapters.forEach((chapter) => {
            const listItem = document.createElement("li");
            const timeSpan = document.createElement("span");
            timeSpan.className = "chapter-time";
            timeSpan.textContent = `${chapter.time}s`;
            const nameSpan = document.createElement("span");
            nameSpan.className = "chapter-name";
            nameSpan.textContent = chapter.name;
            listItem.appendChild(timeSpan);
            listItem.appendChild(nameSpan);
            listItem.addEventListener("click", () => {
                let gracePeriod = parseFloat(gracePeriodInput.value) || 0;
                let startTime = Math.max(0, chapter.time - gracePeriod);
                audioPlayer.currentTime = startTime;
                audioPlayer.play();
            });
            listElement.appendChild(listItem);
        });
    }
    initializeChapters();
});
