
var trivia = {
    question: {
        ask: [],
        option1: [],
        option2: [],
        option3: [],
        option4: [],
        result: [],
        questionTimer: setInterval(1000),
        timer: 30,
    },
    win: 0,
    loss: 0,
    oot: 0,
    currentQ: 0,
    qLoader(ask, option1, option2, option3, option4, result, ) {
        trivia.question.ask.push(ask);
        trivia.question.option1.push(option1);
        trivia.question.option3.push(option3);
        trivia.question.option2.push(option2);
        trivia.question.option4.push(option4);
        trivia.question.result.push(result);
    },
    start() {
        trivia.replay();
        $("#continue").html("Continue");
        $("#continue").css("display", "none");
        $("#start").css("display", "initial");
        $("#start").attr({
            "onclick": "trivia.qCurrent()"
        });
    },
    qCurrent() {
        trivia.timer = 30;
        function startTimer() {
            clearInterval(trivia.questionTimer);
            trivia.questionTimer = setInterval(tickDown, 1000 * 1);
        }
        function tickDown() {
            trivia.timer--;
            $("#seconds-left").html("Remaining Time: " + trivia.timer + " Seconds");
            if (trivia.timer == 0) {
                trivia.qResult();
            }
        }
        startTimer();
        $("#continue").css("display", "none");
        $("#start").css("display", "none");
        $("#answer").html("");
        $("#result").html("");
        $("#pic").html("");
        $("#seconds-left").html("Remaining Time: 30 Seconds");
        $("#q").html(trivia.question.ask[trivia.currentQ]);
        var includes = [];
        var randomizeOptions = [];
        for (let i = 1; i <= 4; i++) {
            var randomNum = -1;
            do {
                randomNum = (Math.floor(Math.random() * 4) + 1);
            } while (includes.includes(randomNum) == true);
            includes.push(randomNum);
            if (randomNum == 1) {
                randomizeOptions.push(trivia.question.option1[trivia.currentQ]);
            }
            if (randomNum == 2) {
                randomizeOptions.push(trivia.question.option2[trivia.currentQ]);
            }
            if (randomNum == 3) {
                randomizeOptions.push(trivia.question.option3[trivia.currentQ]);
            }
            if (randomNum == 4) {
                randomizeOptions.push(trivia.question.option4[trivia.currentQ]);
            }
            $("#a" + i).html(randomizeOptions[i - 1]);
            $("#a" + i).attr("data-option", randomizeOptions[i - 1]);
        }
        $(".option").attr("onclick", "trivia.qResult()");
        trivia.currentQ++;
    },
    qResult() {
        clearInterval(trivia.questionTimer);
        $("#seconds-left").html("");
        $("#q").html("");
        $("#a1").html("");
        $("#a2").html("");
        $("#a3").html("");
        $("#a4").html("");
        $(".option").prop("onclick", null);
        $("#continue").css("display", "initial");
        if (trivia.timer == 0) {
            $("#result").html("You ran out of time!");
            trivia.oot++;
            console.log("oot", trivia.oot);
        } else if (event.target.getAttribute("data-option") == trivia.question.option1[trivia.currentQ - 1]) {
            $("#result").html("You guessed right!");
            trivia.win++;
            console.log("wins", trivia.win);
        } else {
            $("#result").html("You guessed wrong!");
            trivia.loss++;
            console.log("loss", trivia.loss);
        }
        $("#answer").html("The correct answer was: " + trivia.question.option1[trivia.currentQ - 1]);
        $("#pic").html("<img src=./assets/images/" + trivia.question.result[trivia.currentQ - 1] + "></img>");
        if (trivia.currentQ != trivia.question.ask.length) {
            $("#continue").attr("onclick", "trivia.qCurrent()");
        } else {
            $("#continue").attr("onclick", "trivia.finalResult()");
        }
    },
    finalResult() {
        $("#answer").html("");
        $("#pic").html("");
        $("#result").html("Here is how you did!");
        $("#correct").html("Correct Answers: " + trivia.win);
        $("#incorrect").html("Incorrect Answers: " + trivia.loss);
        $("#unanswered").html("Unanswered: " + trivia.oot);
        $("#continue").html("Restart");
        $("#continue").attr("onclick", "trivia.start()");
    },
    replay() {
        $("#result").html("");
        $("#correct").html("");
        $("#incorrect").html("");
        $("#unanswered").html("");
        trivia.win = 0;
        trivia.loss = 0;
        trivia.oot = 0;
        trivia.currentQ = 0;
    }
}
trivia.qLoader("WHAT WAS OUR COUNTRY'S FIRST CONSTITUTION CALLED?", "THE ARTICLES OF CONFEDERATION", "THE FEDERALIST PAPER", "THE EMANCIPATION PROCLAMATION", "THE DECLARATION OF INDEPENDENCE", "const.jpeg", 0);
trivia.qLoader("LAWS FOR THE UNITED STATES ARE MADE BY:", "CONGRESS", "THE SENATE", "THE PRESIDENT", "THE SUPREME COURT", "congress.png", 1);
trivia.qLoader("THE LONGEST POSSIBLE TIME A PERSON CAN NOW SERVE AS PRESIDENT IS:", "10 YEARS", "4 YEARS", "8 YEARS", "12 YEARS", "10years.jpeg", 2);
trivia.qLoader("A MAN ACCUSED OF A CRIME IN COURT HAS A RIGHT TO:", "HEAR THE WITNESSES AGAINST HIM", "BE TRIED WHERE-EVER HE WANTS", "HAVE ANY JUDGE HE WANTS", "CHANGE COURTS", "witness.jpeg", 3);
trivia.qLoader("INVOKING THE FIFTH AMENDMENT MEANS AN ACCUSED MAN:", "REFUSES TO TESTIFY AGAINST HIMSELF", "REFUSES TO BE TRIED AGAIN", "DEMANDS A GRAND JURY", "WANTS TO APPEAL HIS CASE", "thefifth.jpeg", 4);
trivia.qLoader("OUR FIRST VICE-PRESIDENT WAS:", "JOHN ADAMS", "ALEXANDER HAMILTON", "THOMAS JEFFERSON", "BENJAMIN FRANKLIN", "johnadams.jpeg", 5);
trivia.qLoader("THE BILL OF RIGHTS IS:", "FIRST TEN AMENDMENTS", "THE FIFTEENTH AMENDMENT", "THE ENTIRE CONSTITUTION", "ALL OF THE AMENDMENTS", "billofrights.jpeg", 6);
trivia.qLoader("IF NEITHER THE PRESIDENT NOR THE VICE-PRESIDENT CAN SERVE, THE POSITION WOULD BE FILLED BY:", "THE SPEAKER OF THE HOUSE", "THE CHIEF JUSTICE", "THE ELECTED PRESIDENT OF THE SENATE", "THE SECRETARY OF THE STATE", "thehouse.png", 7);
trivia.qLoader("THE MAJOR DEPARTMENT HEAD WHO IS APPOINTED BY THE PRESIDENT TO DEAL WITH FOREIGN COUNTRIES IS THE:", "SECRETARY OF STATE", "SECRETARY OF DEFENSE", "ATTORNEY GENERAL", "SECRETARY OF COMMERCE", "sealofstate.png", 8);
trivia.qLoader("THE PRESIDENT IS ELECTED IF HE:", "WINS A MAJORITY OF THE ELECTORAL VOTES", "WINS MOST OF THE COUNTRY'S VOTE", "WINS ALL THE STATES' VOTES", "WINS MOST OF THE STATES' VOTES", "college.jpeg", 9);
trivia.start();