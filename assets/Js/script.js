//get elements

let q_btn = document.querySelector('.start_btn #quizeBtn');
let next = document.querySelector('.button #next');
let nextquize = document.querySelector('#nextQuize');
let exit = document.querySelector('.button #exit');
let quizeB = document.querySelector('.quize');
let quizCon = document.querySelector('.quize-con');
let quizlist = document.querySelector('.quize-list');

let resultBox = document.querySelector('#result_box');
let resultExit = document.querySelector('#Resultexit');
let reply = document.querySelector('#reply');
let score = document.querySelector('#score');
let image = document.querySelector('#img');
let mass = document.querySelector('#result_titleWish');
let timer = document.querySelector('.timer');


//json data send 
let xttp = new XMLHttpRequest();

xttp.onload = function() {

    localStorage.setItem('question', this.response);

}
xttp.open('GET', '../../data.json');
xttp.send();

//question

let ques = JSON.parse(getQuestion());


//get data from storage

function getQuestion() {
    return localStorage.getItem('question');
}

//result exit

resultExit.onclick = e => {
    resultBox.style.display = 'none';
}

//reply quize

reply.onclick = e => {
    resultBox.style.display = 'none';
    quizCon.style.display = 'block';
    mark = 0;
    // showList(0);

}


//start button
q_btn.onclick = e => {

        quizCon.style.display = 'block';


    }
    //exit quize
exit.onclick = e => {

    quizCon.style.display = 'none';


}

//start quize
next.onclick = e => {


    quizCon.style.display = 'none';
    quizeB.style.display = 'block';
    showList(0);
    timer.innerHTML = 8;
    timeCount(8);


}

//load index
let que_index = 0;
let mark = 0;
let time_count;
nextquize.onclick = e => {




    if (que_index < ques.length - 1) {
        que_index++;
        showList(que_index);
        nextquize.style.pointerEvents = 'none';
        timer.innerHTML = 8;
        timeCount(8);

    } else {


        quizeB.style.display = 'none';
        resultBox.style.display = 'block';
        que_index = 0;
        resultBoxData(mark);

    }



}


function showList(index) {

    quizlist.innerHTML = `<h4>${ques[index].id}. ${ques[index].question} ?</h4>
    <ul class="list">
        <li>i. ${ques[index].option[0]}</li>
        <li>ii. ${ques[index].option[1]}</li>
        <li>iii. ${ques[index].option[2]}</li>
        <li>iv. ${ques[index].option[3]}</li>
    </ul>`;

    let list = document.querySelectorAll('.list li');

    for (i = 0; i < list.length; i++) {

        list[i].setAttribute('onclick', 'getAns(this,' + index + ')');

    }

}

// get answer

function getAns(answer, index) {
    clearInterval(time_count);
    nextquize.style.pointerEvents = 'visible';

    let list = document.querySelectorAll('.list li');

    let userAns = answer.textContent;
    let rightAns = ques[index].ans;

    if (userAns == rightAns) {

        mark += 1;
        answer.classList.add('bg-success');
        answer.classList.add('text-light');

    } else {

        answer.classList.add('bg-danger');
        answer.classList.add('text-light');

        for (i = 0; i < list.length; i++) {

            if (list[i].textContent == rightAns) {

                list[i].classList.add('bg-success');
                list[i].classList.add('text-light');

            }

        }

    }

    for (i = 0; i < list.length; i++) {

        list[i].classList.add('done');

    }

}

// result box data

function resultBoxData(result) {

    score.innerHTML = result;

    if (result >= 0 && result <= 3) {
        image.setAttribute('src', 'assets/image/sad.jpg');
        mass.innerHTML = 'So Sad !!';
    } else if (result >= 4 && result <= 8) {

        image.setAttribute('src', 'assets/image/cogr.png');
        mass.innerHTML = 'Congratulations !!';

    }

}

// set timer

function timeCount(time) {

    let list = document.querySelectorAll('.list li');

    time_count = setInterval(() => {

        timer.innerHTML = time;

        if (time == 0) {

            clearTimeout(time_count);
            nextquize.style.pointerEvents = 'visible';

            for (i = 0; i < list.length; i++) {

                list[i].classList.add('done');

            }

        }
        time--;

    }, 1000);
}