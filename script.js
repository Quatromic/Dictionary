const lookUpbtn = document.getElementById("look"),sound = document.getElementById("sound"),closeBtn = document.getElementById("close")
sound.style.display = "none"
let word = document.querySelector(".word")
const result = document.querySelector("#result")
sound.style.display = "none",result.style.visibility = "hidden"

const checker = async () => {
  if(word.value.length <= 0){
    return;
  }
  else{
    let API = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`).then(response => response.json()).catch(error => {
      console.log(error)
  
      window.alert("No inte try again"),location.reload()
    })
    const header = document.getElementById("Word"),speech = document.getElementById("speech"),meaning = document.getElementById("meaning"),phonetics = document.getElementById("Phonetics")
    if(API){
      result.style.visibility = "visible"
      result.classList.add("open")
      sound.style.display = "block"
      sound.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
      let first = [API[0]]
      for (let element of first){
        header.innerHTML = element.word
        phonetics.innerHTML = element.phonetic?element.phonetic:'<i style="font-family:Dancing Script;">no phonetics</i>'
        if(element.meanings.length <= 1){
          speech.innerHTML = `${element.meanings[0].partOfSpeech}`
          meaning.innerHTML = `${element.meanings[0].definitions[0].definition} (${element.meanings[0].partOfSpeech})`
          console.log(element.phonetics)
        }
        else{
          speech.innerHTML = `${element.meanings[0].partOfSpeech}, ${element.meanings[1].partOfSpeech}`
          meaning.innerHTML = `${element.meanings[0].definitions[0].definition} (${element.meanings[0].partOfSpeech}) <br/> ${element.meanings[1].definitions[0].definition} (${element.meanings[1].partOfSpeech})`
          const Sound = new Audio(element.phonetics[0].audio?element.phonetics[0].audio:"null")
          sound.onclick = () => {
            if(Sound)
              Sound.play().then(() => console.log("Played audio")).catch(error => console.log("Error"))
            else
              console.log("Error with playing audio")
          }
        }
      }
    }
  }
}

const caller = async () => {
  const Func1 = await checker().catch(error => console.log(error))
}

lookUpbtn.addEventListener("click",caller)
closeBtn.addEventListener("click",() => {
  result.classList.remove("open")
  word.value = ""
})