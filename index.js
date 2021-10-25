const editor = document.getElementById('txtid')
const wordCounter = document.getElementById('word-count')
const charCounter = document.getElementById('char-count')
const charCountWithoutSpace = document.getElementById('count-without-space')
const paraCounter = document.getElementById('para-count')
const sentenceCounter = document.getElementById('sentence-count')
const longest = document.getElementById('longest')
const buttonClear = document.getElementById('btn-clear')
const buttonCopy = document.getElementById('btn-copy')
const infoElements = document.getElementsByClassName('info')

buttonClear.addEventListener('click', () => {
    editor.value = "";
    for (let i=0; i<infoElements.length; i++) infoElements[i].textContent = 0
    longest.textContent = '_ _ _ _ _ _ _ _ _ _ _ _';
})

buttonCopy.addEventListener('click', () => {
    editor.focus();
    editor.select();
    navigator.clipboard.writeText(editor.value)
})

editor.addEventListener('keyup', (e) => {
    charCounter.textContent = e.target.value.trim().length
    charCountWithoutSpace.textContent = e.target.value.replace(/\s+/g, "").length
    
    const wordList = e.target.value.split(/\s+/).filter((word) => /^[A-Za-z]+/.test(word))
    wordCounter.textContent = wordList.length;
    longest.textContent = getLongestWord(wordList)

    paraCounter.textContent = e.target.value.replace(/\n$/gm, "").split(/\n/)?.length;
    const sentenceCount = e.target.value.match(/\w[.?!](\s|$)/g)?.length;
    if (sentenceCount) sentenceCounter.textContent = sentenceCount;
}) 

const getLongestWord = (wordList) => {
    wordList.sort((a,b)=>{return b.length-a.length});
    return wordList[0]
}

