const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then((json) => displayLessons(json.data));
};
const removeActive=()=>{
    const activeBtn = document.querySelectorAll(".lesson-btn");
    activeBtn.forEach(btn=>btn.classList.remove("active"));
};


const loadLevelWord=(id)=>{
    // console.log(id)
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url)
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    });
};

const loadDetails=async(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data)


}

const displayDetails = (word)=>{
    const detailBox = document.getElementById('details-container');
    // "word": "Eager",    
    // "meaning": "আগ্রহী",  
    // "pronunciation": "ইগার",    
    // "level": 1,    
    // "sentence": "The kids were eager to open their gifts.",
        
    // "points": 1,    
    // "partsOfSpeech": "adjective",    
    // "synonyms": 
    // [      
    // "enthusiastic",      
    // "excited",      
    // "keen"    
    // ]
    detailBox.innerHTML=`
        <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms</h2>
            <span class="btn">syn1</span>
            <span class="btn">syn2</span>
            <span class="btn">syn3</span>
        </div>
    `;
    document.getElementById('my_modal_5').showModal();
};

const displayLevelWord=(words)=> {
    // console.log(words);
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML="";

    if (words.length == 0){
        wordContainer.innerHTML=`
            <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
                <img class="mx-auto" src="./assets/alert-error.png/">
                <p class="text-xl font-medium text-gray-400">
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="font-bold text-4xl">
                    নেক্সট Lesson এ যান
                </h2>
            </div>
        `;
    }

    words.forEach(word=>{
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">
                ${word.word ? word.word:"no word found"}
            </h2>
            <p class="font-semibold">
                Meaning /Pronounciation
            </p>
            <div class="text-2xl font-medium font-bangla">
                ${word.meaning?word.meaning:"no meaning found"} / ${word.pronunciation?word.pronunciation:"no pronunciation found"}
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}
const displayLessons= (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML="";
    // 2.get into every lessons    
    for (let lesson of lessons){
        //3.create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        // 4.append into container
        levelContainer.append(btnDiv)
    }
};
loadLessons();