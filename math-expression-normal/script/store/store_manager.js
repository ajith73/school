const initStore = {
    pageNumber: 1,
    storedAnswers: {
        1: {
            1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
        },
        2: {
            1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
        },
        3: {
            1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
        },
        4: {
            1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
        },
        5: {
            1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
            3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
        },
    },
    correctAnswer: {
        1: {
            1: { 1: "4", 2: "3", 3: "5", 4: "5", 5: "2", 6: "6", 7: "2", 8: "4", 9: "3" },
            2: { 1: "4", 2: "7", 3: "2", 4: "2", 5: "3", 6: "12", 7: "3", 8: "4", 9: "7" },
            3: { 1: "3", 2: "4", 3: "7", 4: "21", 5: "7", 6: "8", 7: "8", 8: "3", 9: "4" }
        },
        2: {
            1: { 1: "8", 2: "9", 3: "3", 4: "27", 5: "3", 6: "4", 7: "4", 8: "8", 9: "9" },
            2: { 1: "4", 2: "7", 3: "5", 4: "5", 5: "8", 6: "32", 7: "8", 8: "4", 9: "7" },
            3: { 1: "5", 2: "8", 3: "2", 4: "10", 5: "2", 6: "7", 7: "7", 8: "5", 9: "8" }
        },
        3: {
            1: { 1: "7", 2: "8", 3: "3", 4: "3", 5: "4", 6: "32", 7: "4", 8: "7", 9: "8" },
            2: { 1: "7", 2: "2", 3: "5", 4: "35", 5: "5", 6: "9", 7: "9", 8: "7", 9: "2" },
            3: { 1: "5", 2: "8", 3: "7", 4: "56", 5: "7", 6: "3", 7: "3", 8: "5", 9: "8" }
        },
        4: {
            1: { 1: "6", 2: "7", 3: "4", 4: "4", 5: "9", 6: "63", 7: "9", 8: "6", 9: "7" },
            2: { 1: "8", 2: "9", 3: "7", 4: "7", 5: "9", 6: "72", 7: "9", 8: "8", 9: "9" },
            3: { 1: "6", 2: "7", 3: "9", 4: "9", 5: "4", 6: "28", 7: "4", 8: "6", 9: "7" }
        },
        5: {
            1: { 1: "4", 2: "7", 3: "9", 4: "9", 5: "2", 6: "14", 7: "2", 8: "4", 9: "7" },
            2: { 1: "8", 2: "9", 3: "4", 4: "4", 5: "7", 6: "56", 7: "7", 8: "8", 9: "9" },
            3: { 1: "7", 2: "6", 3: "9", 4: "63", 5: "9", 6: "8", 7: "8", 8: "7", 9: "6" }
        },
    },

    SubContainer1: false,
    SubContainer2: false,
    SubContainer3: false,
    SubContainer4: false,
    SubContainer5: false,
    ...fileMetadata
};

var lettersWithSpace = /^[a-zA-Z ]*$/;
var numbersOnly = /^[0-9]*$/;
var newLine = null;
var clickedCircle = null;
var snapRange = 15;
var isDragged = false;
var currentModal = "";

var containerNumber = "";
var tableNumber = "";
var fieldNumber = "";

function calculateMidpoint(x1, y1, x2, y2) {
    return { x: ((x1 + x2) / 2), y: ((y1 + y2) / 2) }
}
// function tableUpdate(container, table, field, value) {
//     $("#container" + container + "-table" + table + "-field" + field).val(value);
// }
async function updateValue(number, tableIndex, index, value) {
    await $("#popContainer" + number + "-table" + tableIndex + "-field" + index).val(value);
}

class StoreManager {
    constructor() {
        this.packageId = fileMetadata.id;
        this.store = initStore;
        localStorage.setItem(this.packageId, JSON.stringify(this.store));
    }


    /**
     * Everytime a value is changed developer should call callLocalStorageOnChange method, 
     * so that the changes will be stored in the browser local storage memory.
     */
    callLocalStorageOnChange() {
        localStorage.setItem(this.packageId, JSON.stringify(this.store));
    }

    /**
     * returns the entire store value
     */
    getStore() {
        return this.store;
    }

    /**
     * @param  {} currentPageNumber
     * Every time page is changed setPageNumber is triggered.
     */
    setPageNumber(currentPageNumber) {
        this.store.pageNumber = currentPageNumber;
        this.callLocalStorageOnChange();
    }

    getCurrentPageNumber() {
        return this.store.pageNumber;
    }

    /**
     * @param  {String} propertyPath
     * This function is not yet complete
     */
    getPropertyValue(propertyPath) {
        const strSplit = propertyPath.split('.');
    }

    addPreviousAnswersToInputboxes() {
        $('input').each((i, obj) => {
            const correctAnswer = $(obj).attr("data-correct-answer");
            const inputId = $(obj).attr("id");
            if (this.store.storedAnswers[inputId]) {
                $(obj).val(this.store.storedAnswers[inputId]);
                if (correctAnswer) {
                    if (this.store.storedAnswers[inputId] === "" || !this.store.isMatchChecked) {
                        $(obj).css({ "border-color": "#10B3F0", "border-width": "1px" });
                    } else if (correctAnswer === this.store.storedAnswers[inputId].toLowerCase()) {
                        $(obj).css({ "border-color": "green", "border-width": "2px" });
                    } else {
                        $(obj).css({ "border-color": "red", "border-width": "2px" });
                    }
                }
            }
        });
        $('.image-list select').each((i, obj) => {
            const correctAnswer = $(obj).attr("data-correct-answer");
            const inputId = $(obj).attr("id").replace("page-", "");
            if (this.store.storedAnswers[inputId]) {
                $(obj).val(this.store.storedAnswers[inputId]).change();
                $("#page-" + inputId).val(this.store.storedAnswers[inputId]).change();
                if (correctAnswer) {
                    if (this.store.storedAnswers[inputId] === "") {
                        $(".feedback-correct-" + inputId).hide();
                        $(".feedback-incorrect-" + inputId).hide();
                        this.store.storedAnswers[".feedback-correct-" + inputId] = false;
                        this.store.storedAnswers[".feedback-incorrect-" + inputId] = false;
                    } else if (correctAnswer === this.store.storedAnswers[inputId].toLowerCase() && this.store.storedAnswers[".feedback-correct-" + inputId]) {
                        $(".feedback-correct-" + inputId).show();
                        $(".feedback-incorrect-" + inputId).hide();
                        this.store.storedAnswers[".feedback-correct-" + inputId] = true;
                        this.store.storedAnswers[".feedback-incorrect-" + inputId] = false;
                    } else if (this.store.storedAnswers[".feedback-incorrect-" + inputId]) {
                        $(".feedback-correct-" + inputId).hide();
                        $(".feedback-incorrect-" + inputId).show();
                        this.store.storedAnswers[".feedback-correct-" + inputId] = false;
                        this.store.storedAnswers[".feedback-incorrect-" + inputId] = true;
                    }
                }
            }
        });
        this.drawLines();
        setTimeout(() => {
            this.drawLines();
        }, 500);
        this.prismUpdate();
        this.cubeUpdate();
    }
    prismUpdate(number) {
        $(".clear-all-answer-btn").attr("disabled", false);
        $(".check-answer-btn").attr("disabled", true);
        $(".modalQuestion-container-" + number).find('.small-table').each((i, elem) => {
            let tableIndex = i + 1;
            $(elem).find('.tab-input').each((i, obj) => {
                const inputId = $(obj).attr("id");
                // let container= inputId.charAt(9);
                //  let table= inputId.charAt(16);
                //  let field = inputId.charAt(inputId.length -1);
                let value = this.store.storedAnswers[number][tableIndex][i + 1];
                updateValue(number, tableIndex, i + 1, value);
            })
        })

        // $(".prism").each((i, obj) => {
        //     const inputId = $(obj).attr("id");
        //     if (this.store.storedAnswers[inputId] || this.store.storedAnswers[inputId.replace('page-', '')]) {
        //         $("#" + inputId).attr("aria-pressed", "true");
        //         $("#" + inputId).children(".wrong").css('display', 'block');
        //         if (this.store.storedAnswers['feedback-' + inputId.replace('page-', '')]) {
        //             $('.feedback-' + inputId.replace('page-', '')).show();
        //         }
        //         // if (this.store.isPrismChecked) {
        //         //     $("#" + inputId).children(".blue-wrong").css('display', 'none');
        //         // }
        //         $(".clear-all-answer-btn").removeAttr("disabled");
        //         $(".check-answer-btn").removeAttr("disabled");
        //     } else {
        //         $("#" + inputId).attr("aria-pressed", "false");
        //         $("#" + inputId).children(".wrong").css('display', 'none');
        //         $('.feedback-' + inputId.replace('page-', '')).hide();
        //         delete this.store.storedAnswers['feedback-' + inputId.replace('page-', '')];
        //     }
        // });
        // this.callLocalStorageOnChange();
    }
    cubeUpdate() {
        $(".clear-all-answer-btn").attr("disabled", true);
        $(".check-answer-btn").attr("disabled", true);
        $(".cube").each((i, obj) => {
            const inputId = $(obj).attr("id");
            const correctAnswer = $(obj).attr("data-correct-answer");
            if (this.store.storedAnswers[inputId] || this.store.storedAnswers[inputId.replace('page-', '')]) {
                $("#" + inputId).attr("aria-pressed", "true");
                $("#" + inputId).css({ 'border': '2px solid #6c90ff', 'background-color': 'rgb(108 144 255 / 30%)' });
                $("#page-" + inputId).css({ 'border': '2px solid #6c90ff', 'background-color': 'rgb(108 144 255 / 30%)' });
                if (this.store.storedAnswers['feedback-' + inputId.replace('page-', '')]) {
                    $('.feedback-' + inputId.replace('page-', '')).show();
                }
                $(".clear-all-answer-btn").removeAttr("disabled");
                $(".check-answer-btn").removeAttr("disabled");
            } else {
                $("#" + inputId).attr("aria-pressed", "false");
                $("#" + inputId).css({ 'border': '2px solid transparent', 'background-color': 'transparent' });
                $("#page-" + inputId).css({ 'border': '2px solid transparent', 'background-color': 'transparent' });
                $('.feedback-' + inputId.replace('page-', '')).hide();
                delete this.store.storedAnswers['feedback-' + inputId.replace('page-', '')];
            }
        });
        this.callLocalStorageOnChange();
    }
    drawLines(isDragger = false) {
        if (document.querySelector("#line-svg")) {
            document.querySelector("#line-svg g").innerHTML = "";
            $(".clickable-circle").each((i, obj) => {
                const inputId = $(obj).attr("id");
                let x1 = parseFloat($(obj).attr('cx'));
                let y1 = parseFloat($(obj).attr('cy'));
                if (this.store.storedAnswers[inputId]) {
                    const left = inputId;
                    const right = this.store.storedAnswers[inputId];
                    const correctAnswer = $("#" + left).attr("data-correct-answer");
                    let x2 = parseFloat($("#" + right).attr('cx'));
                    let y2 = parseFloat($("#" + right).attr('cy'));
                    const svgns = "http://www.w3.org/2000/svg";

                    const groupElement = document.createElementNS(svgns, 'g');
                    groupElement.setAttribute('class', 'interactive-wrapper');

                    // Create wrapper forigen object
                    const foreignObject = document.createElementNS(svgns, 'foreignObject');
                    const closeBtnPoi = calculateMidpoint(x1, y1, x2, y2);
                    foreignObject.setAttribute('x', closeBtnPoi.x - 10);
                    foreignObject.setAttribute('y', closeBtnPoi.y - 10);
                    foreignObject.setAttribute('width', 22);
                    foreignObject.setAttribute('height', 22);

                    // Create new button
                    const btn = document.createElement("button");
                    btn.innerHTML = "X";
                    btn.setAttribute('class', 'forigen-object-button');
                    foreignObject.style.display = 'none';

                    let newLine = document.createElementNS(svgns, "line");
                    newLine.setAttribute('x1', x1);
                    newLine.setAttribute('y1', y1);
                    newLine.setAttribute('x2', x2);
                    newLine.setAttribute('y2', y2);
                    newLine.setAttribute('stroke-width', '2px');
                    newLine.setAttribute('data-start-point', inputId);
                    newLine.setAttribute('data-end-point', right);
                    newLine.setAttribute('stroke', '#10b3f0');
                    groupElement.appendChild(newLine);
                    foreignObject.appendChild(btn);
                    groupElement.appendChild(foreignObject);

                    $(`#${left}`).addClass('mapped');
                    $(`#${right}`).addClass('mapped');
                    if (!isDragger) {
                        if (left.indexOf("left") != -1) {
                            if (right == correctAnswer && this.store.storedAnswers[".feedback-correct-" + left]) {
                                $(".feedback-correct-" + left).show();
                                $(".feedback-incorrect-" + left).hide();
                            } else if (this.store.storedAnswers[".feedback-incorrect-" + left]) {
                                $(".feedback-correct-" + left).hide();
                                $(".feedback-incorrect-" + left).show();
                            }
                        } else {
                            if (right == correctAnswer && this.store.storedAnswers[".feedback-correct-" + right]) {
                                $(".feedback-correct-" + right).show();
                                $(".feedback-incorrect-" + right).hide();
                            } else if (this.store.storedAnswers[".feedback-incorrect-" + right]) {
                                $(".feedback-correct-" + right).hide();
                                $(".feedback-incorrect-" + right).show();
                            }
                        }
                    }

                    // targeting the svg itself
                    const svg = document.querySelector("#line-svg g");
                    // append the new rectangle to the svg
                    svg.appendChild(groupElement);
                }
            });
        }

        if (document.querySelector("#page-line-svg")) {
            document.querySelector("#page-line-svg g").innerHTML = "";
            $(".clickable-circle").each((i, obj) => {
                let inputId = $(obj).attr("id");
                inputId = inputId.replace('page-', '');
                let x1 = parseFloat($("#page-" + inputId).attr('cx'));
                let y1 = parseFloat($("#page-" + inputId).attr('cy'));
                if (this.store.storedAnswers[inputId]) {
                    const left = "page-" + inputId;
                    const right = "page-" + this.store.storedAnswers[inputId];
                    const correctAnswer = $("#" + left).attr("data-correct-answer");
                    let x2 = parseFloat($("#" + right).attr('cx'));
                    let y2 = parseFloat($("#" + right).attr('cy'));
                    const svgns = "http://www.w3.org/2000/svg";

                    const groupElement = document.createElementNS(svgns, 'g');
                    groupElement.setAttribute('class', 'interactive-wrapper');

                    // Create wrapper forigen object
                    const foreignObject = document.createElementNS(svgns, 'foreignObject');
                    const closeBtnPoi = calculateMidpoint(x1, y1, x2, y2);
                    foreignObject.setAttribute('x', closeBtnPoi.x - 10);
                    foreignObject.setAttribute('y', closeBtnPoi.y - 10);
                    foreignObject.setAttribute('width', 22);
                    foreignObject.setAttribute('height', 22);

                    // Create new button
                    const btn = document.createElement("button");
                    btn.innerHTML = "X";
                    btn.setAttribute('class', 'forigen-object-button');
                    foreignObject.style.display = 'none';

                    let newLine = document.createElementNS(svgns, "line");
                    newLine.setAttribute('x1', x1);
                    newLine.setAttribute('y1', y1);
                    newLine.setAttribute('x2', x2);
                    newLine.setAttribute('y2', y2);
                    newLine.setAttribute('stroke-width', '2px');
                    newLine.setAttribute('data-start-point', "page-" + inputId);
                    newLine.setAttribute('data-end-point', right);
                    newLine.setAttribute('stroke', '#10b3f0');
                    groupElement.appendChild(newLine);
                    foreignObject.appendChild(btn);
                    groupElement.appendChild(foreignObject);

                    $(`#${left}`).addClass('mapped');
                    $(`#${right}`).addClass('mapped');
                    if (!isDragger) {
                        if (left.indexOf("left") != -1) {
                            if (right == correctAnswer && this.store.storedAnswers[".feedback-correct-" + left.replace("page-", "")]) {
                                $(".feedback-correct-" + left.replace("page-", "")).show();
                                $(".feedback-incorrect-" + left.replace("page-", "")).hide();
                            } else if (this.store.storedAnswers[".feedback-incorrect-" + left.replace("page-", "")]) {
                                $(".feedback-correct-" + left.replace("page-", "")).hide();
                                $(".feedback-incorrect-" + left.replace("page-", "")).show();
                            }
                        } else {
                            if (right == correctAnswer && this.store.storedAnswers[".feedback-correct-" + right.replace("page-", "")]) {
                                $(".feedback-correct-" + right.replace("page-", "")).show();
                                $(".feedback-incorrect-" + right.replace("page-", "")).hide();
                                this.store.storedAnswers[".feedback-correct-" + right.replace("page-", "")] = true;
                            } else if (this.store.storedAnswers[".feedback-incorrect-" + right.replace("page-", "")]) {
                                $(".feedback-correct-" + right.replace("page-", "")).hide();
                                $(".feedback-incorrect-" + right.replace("page-", "")).show();
                                this.store.storedAnswers[".feedback-correct-" + right.replace("page-", "")] = false;
                            }
                        }
                    }
                    // targeting the svg itself
                    const svg = document.querySelector("#page-line-svg g");
                    // append the new rectangle to the svg
                    svg.appendChild(groupElement);
                }
            });
        }
        this.callLocalStorageOnChange();
    }
    bindEventListeners() {
        // $(".match-question").on('click', () => {
        //     $(".show-answer-btn").attr('data-show', 'show');
        //     $(".show-answer-btn").html('<i class="fa-solid fa-eye"></i> Show Answer</button>');
        //     this.loadMatch();
        // });
        // $(".match-question").on('keydown', (e) => {
        //     if (e.which == 13 || e.which == 32) {
        //         this.loadMatch();
        //     }
        // });
        $('.tab-input').on('input', (e) => {
            $(".clear-all-answer-btn").attr("disabled", true);
            $(".check-answer-btn").attr("disabled", true);
            const dataType = $(this).attr("data-type");
            let element = e.currentTarget;
            let elementValue = element.value;
            let attribute = $(element).data("table");
            $('.tab-input').each(function () {
                if ($(this).val() != "" && !isNaN($(this).val()) || $('.tab-input').val().length) {
                     $(".clear-all-answer-btn").attr("disabled", false); $(".check-answer-btn").attr("disabled", false); };
            })
            switch (attribute) {
                case undefined:
                    if (!numbersOnly.test(elementValue) || isNaN(elementValue) || elementValue.length > 1) {
                        e.preventDefault();
                        element.value = elementValue.slice(0, -1);
                        return;
                    }
                    break;

                default:
                    if (!numbersOnly.test(elementValue) || isNaN(elementValue) || elementValue.length > 2) {
                        e.preventDefault();
                        element.value = elementValue.slice(0, -1);
                        return;
                    }
                    break;
            }
            let container = () => {
                let number = $(element).closest(".sub-container")[0].classList[0];
                return number[number.length - 1];
            };
            let table = () => {
                let number = $(element)[0].id.charAt(19);
                return number;
            }
            let number = () => {
                let number = $(element)[0].id;
                return number[number.length - 1];
            }
            let value = element.value;
            containerNumber = container();
            tableNumber = table();
            fieldNumber = number();
            this.store.storedAnswers[containerNumber][tableNumber][fieldNumber] = value;
            // tableUpdate(containerNumber, tableNumber, fieldNumber, value);
            console.log(this.store.storedAnswers)
        });

        $(".clear-all-answer-btn").on('click', () => {
            $('.tab-input').val('').removeClass("feedback-incorrect").removeClass("feedback-correct");
            $(".clear-all-answer-btn").attr("disabled", true);
            $(".check-answer-btn").attr("disabled", true);
        })
        $('.check-answer-btn').on('click', () => {
            // JSON.stringify(this.store.correctAnswer) === JSON.stringify(this.store.storedAnswers) ? console.log("true") : console.log("false")
            let arrayStoredAnswer = Object.keys(this.store.storedAnswers);
            arrayStoredAnswer.forEach((k)=>{
            let arrayContainer = Object.keys(this.store.storedAnswers[k]);
        arrayContainer.forEach((i) => {
            let index = i;
            let arrayTable = Object.keys(this.store.storedAnswers[k][index]);
            arrayTable.forEach((j) => {
                let val = $(`#popContainer${k}-table${i}-field${j}`).val();
                console.log(val)
                if (val != "") {
                    if (val == this.store.correctAnswer[k][i][j]) {
                        $(`#popContainer${k}-table${i}-field${j}`).removeClass("feedback-incorrect").addClass("feedback-correct");
                        $(`#container${k}-table${i}-field${j}`).removeClass("feedback-incorrect").addClass("feedback-correct");
                    } else {
                        $(`#popContainer${k}-table${i}-field${j}`).removeClass("feedback-correct").addClass("feedback-incorrect");
                        $(`#container${k}-table${i}-field${j}`).removeClass("feedback-correct").addClass("feedback-incorrect");
                    }
                } else {
                    $(`#popContainer${k}-table${i}-field${j}`).removeClass("feedback-incorrect").removeClass("feedback-correct");
                    $(`#container${k}-table${i}-field${j}`).removeClass("feedback-incorrect").removeClass("feedback-correct");
                }
            })
        });})
        $(".check-answer-btn").attr("disabled", true);
        })

        let className = "";
        let dataNumber = "";
       
        $("#btnClearAll").on('click', () => {
            if (this.getCurrentPageNumber() == 1) {
                this.clearMatch();
            } else if (this.getCurrentPageNumber() == 2) {
                this.clearCube();
                this.clearPrism();
            }
            $(".clear-all-answer-btn").attr("disabled", true);
            $(".check-answer-btn").attr("disabled", true);
        });
    }
    bindGlobalEvents() {

        $(".modal-close-btn").on('click', () => {
            $("#content-modal-01").modal("hide");
            if (currentModal == "match") {
                $(".match-question").focus();
            } else if (currentModal == "cube") {
                $(".cube-question").focus();
            } else if (currentModal == "prism") {
                $(".prism-question").focus();
            }
        });

        $(".clear-all-answer-btn").on('click', () => {
            console.log(currentModal, "dfgfd");
            if (currentModal == "cube") {
                this.clearCube();
            } else if (currentModal == "prism") {
                this.clearPrism();
            } else if (currentModal == "match") {
                this.clearMatch();
            }
            $(".clear-all-answer-btn").attr("disabled", true);
            $(".check-answer-btn").attr("disabled", true);
        });
        $(".check-answer-btn").on('click', () => {
            console.log("fhdsj")
            if (currentModal == "cube") {
                this.checkCube();
            } else if (currentModal == "prism") {
                this.checkPrism();
            } else if (currentModal == "match") {
                this.checkMatch();
            }
            $(".check-answer-btn").attr("disabled", true);
        });
        $(".show-answer-btn").on('click', (e) => {
            if ($(e.target).attr("data-show") === 'show') {
                $(e.target).attr('data-show', 'hide');
                $(e.target).html('<i class="fa-solid fa-eye-slash"></i> Hide Answer</button>');
                $("circle").css("cursor", "default");
                $(".popup-question-container .list-input").css("cursor", "default");
            } else {
                $(e.target).attr('data-show', 'show');
                $(e.target).html('<i class="fa-solid fa-eye"></i> Show Answer</button>');
                $("circle").css("cursor", "pointer");
                $(".popup-question-container .list-input").css("cursor", "pointer");
            }

            if (currentModal == "cube") {
                $(".cube").toggleClass('clickable-image nonclickable-image');
                $(".nonclickable-image").attr('tabindex', '-1');
                $(".clickable-image").attr('tabindex', '0');
                if ($(e.target).attr("data-show") === 'show') {
                    this.clearCube();
                } else {
                    this.showAnswerCube();
                }
            } else if (currentModal == "prism") {
                $(".prism").toggleClass('clickable-image nonclickable-image');
                $(".nonclickable-image").attr('tabindex', '-1');
                $(".clickable-image").attr('tabindex', '0');
                if ($(e.target).attr("data-show") === 'show') {
                    this.clearPrism();
                } else {
                    this.showAnswerPrism();
                }
            } else if (currentModal == "match") {
                if ($(e.target).attr("data-show") === 'show') {
                    $(".image-list-popup select").removeAttr('disabled');
                    $(".forigen-object-button").removeAttr('disabled');
                    this.clearMatch();
                } else {
                    this.showAnswerMatch();
                    $(".image-list-popup select").attr('disabled', true);
                    $(".forigen-object-button").attr('disabled', true);
                }
            }
            $(".clear-all-answer-btn").attr("disabled", true);
            $(".check-answer-btn").attr("disabled", true);
        });
    }
    // loadPrism(number) {
    //     $(".navigation-btn").removeAttr("disabled");
    //     switch (number) {
    //         case '1':
    //             $(".btn-left").attr("disabled", true);
    //             break;
    //         case '5':
    //             $(".btn-right").attr("disabled", true);
    //             break
    //         default:
    //             break;
    //     }

    //     containerNumber = number;

    //     let store = this.store;
    //     $(".modal-content-wrapper").empty().load(`./templates/modals/page1_modal${number}.html`, () => {
    //         this.prismUpdate(number);
    //         $("#content-modal-01").modal("show");



    //         $('.tab-input').on('input', (e) => {
    //             const dataType = $(this).attr("data-type");
    //             let element = e.currentTarget;
    //             let elementValue = element.value;
    //             let attribute = $(element).data("table");
    //             switch (attribute) {
    //                 case undefined:
    //                     if (!numbersOnly.test(elementValue) || isNaN(elementValue) || elementValue.length > 1) {
    //                         e.preventDefault();
    //                         element.value = elementValue.slice(0, -1);
    //                         return;
    //                     }
    //                     break;

    //                 default:
    //                     if (!numbersOnly.test(elementValue) || isNaN(elementValue) || elementValue.length > 2) {
    //                         e.preventDefault();
    //                         element.value = elementValue.slice(0, -1);
    //                         return;
    //                     }
    //                     break;
    //             }
    //             let container = () => {
    //                 let number = $(element).closest(".sub-container")[0].classList[0];
    //                 return number[number.length - 1];
    //             };
    //             let table = () => {
    //                 let number = $(element)[0].id.charAt(19);
    //                 return number;
    //             }
    //             let number = () => {
    //                 let number = $(element)[0].id;
    //                 return number[number.length - 1];
    //             }
    //             let value = element.value;
    //             containerNumber = container();
    //             tableNumber = table();
    //             fieldNumber = number();
    //             store.storedAnswers[containerNumber][tableNumber][fieldNumber] = value;
    //             // tableUpdate(containerNumber, tableNumber, fieldNumber, value);
    //         });
    //     });
    //     // this.callLocalStorageOnChange();
    // }
}