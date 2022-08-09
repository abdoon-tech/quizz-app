var startquiz = document.getElementById("button");
var container = document.getElementById("wrapper");
var questionbox = document.getElementById("questionbox");
var data = firebase.database().ref("exercise");

var addquestion = document.getElementById("button2")
var adminDone = document.getElementById("admin-continue");
var popup = document.getElementById("popup");
var Done = document.getElementById("continue");
var closepopup = document.getElementById("close")
var admin = document.getElementById("admin");
var closeAdminpPopup = document.getElementById("close-admin")


data.child("quiz").once("value", getquestion)

startquiz.addEventListener("click", function() {
    questionbox.style.display = "block";
    data.child("sentence-structure").once("value", getquestion)
})




addquestion.addEventListener("click", function() {
    admin.style.display= "block";
})

adminDone.addEventListener("click", function() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    const userAuth =firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            let users = firebase.auth().currentUser;
            popup.style.display="block"
            admin.style.display="none"
        })
        .catch(e => alert(e.message))
    

})



closeAdminpPopup.addEventListener("click", function() {
    admin.style.display = "none";

})

Done.addEventListener("click", function() {
    addQ();
})

closepopup.addEventListener("click", function() {
    popup.style.display = "none";

})











function getquestion(snapshot) {
    var key = Object.keys(snapshot.val());
    var randomIndex = Math.floor(Math.random() * key.length);
    var qnum = key[randomIndex];
    getrandomquestion(qnum, key);
};


function getrandomquestion(qnum, key) {
    data.child("quiz").child(qnum).once("value", function(snapshot) {
        var question = snapshot.val().question;
        var choiceA = snapshot.val().A1;
        var choiceB = snapshot.val().A2;
        var choiceC = snapshot.val().A3;
        var correct = snapshot.val().Correct;
        renderquestion(question, choiceA, choiceB, choiceC);
        checkanswer(correct);
    })
}




function renderquestion(question, choiceA, choiceB, choiceC) {
    questionbox.innerHTML += ` 
        <div id="question_container">
            <div id="question-head">${question}</div>
            <div id="choices">
                <div class="choice"  id="A">${choiceA}</div>
                <div class="choice"  id="b">${choiceB}</div>
                <div class="choice"  id="c">${choiceC}</div>
            </div>
            <i class="fas fa-times" id="closequiz"></i>
        </div>`;
    var closequiz = document.getElementById("closequiz");
    closequiz.onclick = function() {
        questionbox.style.display = "none";
    }
}



function checkanswer(correct) {
    document.onclick = function(e) {
        var target = e.target;
        if (target.textContent == correct) {
            var q = document.getElementById("question_container")
            questionbox.removeChild(q);
            data.child("quiz").once("value", getquestion)
        }
    };
}



function addQ() {
    var question = document.getElementById("text-input").value;
    var A1 = document.getElementById("a1").value;
    var A2 = document.getElementById("a2").value;
    var A3 = document.getElementById("a3").value;
    var Correct = document.getElementById("correct").value;
    data.child("quiz").push({
        question: question,
        A1: A1,
        A2: A2,
        A3: A3,
        Correct: Correct
    });
    document.getElementById("text-input").value = "";
    document.getElementById("a1").value = "";
    document.getElementById("a2").value = "";
    document.getElementById("a3").value = "";
    document.getElementById("correct").value = "";

}