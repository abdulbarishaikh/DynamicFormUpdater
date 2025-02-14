class DynamicFormUpdater {
    #eventList = [
        'change',        // Triggered when the value of an input/select/checkbox changes.
        'input',         // Triggered when the user types into an <input> element or changes the value of <textarea>.
        'focus',         // Triggered when the input/select/checkbox element gains focus.
        'blur',          // Triggered when the input/select/checkbox element loses focus.
        'focusin',       // Triggered when the input/select/checkbox element is focused (bubbles).
        'focusout',      // Triggered when the input/select/checkbox element loses focus (bubbles).
        'select',        // Triggered when a selection of text inside an <input> element is made.
        'click',         // Triggered when a checkbox or radio button is clicked.
        'change',        // Triggered when the value of a checkbox or radio button is changed.
        'keydown',       // Triggered when a key is pressed while the input element is focused.
        'keypress',      // Triggered when a key is pressed and held while the input element is focused.
        'keyup',         // Triggered when a key is released while the input element is focused.
        'input',         // Triggered when the value of an <input>, <textarea>, or <select> element is changed.
    ];
    #mainElement = "";
    #targetObj = {};
    #requestObj = {};
    constructor(element, targetElementObj, events = "click") {
        this.mainElement = element;
        this.targetObj = targetElementObj;
        $(this.mainElement).bind(events, (e) => {  // Use arrow function to bind the correct 'this'
            this[e.type]();  // Call the corresponding method dynamically
        });
    }
    change() {

        if (this.targetObj.hasOwnProperty('data')) {
            const data = this.targetObj.data;
            this.addData(data)
        } else if (this.targetObj.hasOwnProperty('url')) {
            console.log('', this.targetObj);

            this.sendRequest()

        }
    }
    sendRequest() {
        $.ajax({
            url: this.targetObj.url,
            method: this.requestObj?.method ?? "GET",
            async: false,
            success: (response) => {
                let updatedArr = [];
                if (this.targetObj.hasOwnProperty('labelText') && this.targetObj.hasOwnProperty('labelValue')) {
                    updatedArr = response;
                    console.log(updatedArr);


                } else {
                    if (this.propertyExists(response, 'optionLabel') && this.propertyExists(response, 'optionValue')) {
                        console.log('response >> ', response);
                    } else {
                        response.forEach((item, index) => {
                            updatedArr.push({
                                labelText: item.name,
                                labelValue: item.id,
                            });
                        });

                    }
                }
                this.addData(updatedArr);

            }
        })

    }
    propertyExists(array, property) {
        return array.some(obj => obj
            .hasOwnProperty(property));
    }

    addData(data) {
        const targetElement = this.targetObj?.element;
        const valArray = [];
        var targetElementType = $(targetElement)?.get(0)?.tagName;
        if (this.targetObj.makeEmpty) {
            if (targetElementType == 'SELECT') {
                $(targetElement).empty();
            } else {
                $(targetElement).val();
            }

        }
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                let obj = {
                    value: '',
                };
                if (this.targetObj.hasOwnProperty('labelText') && this.targetObj.hasOwnProperty('labelValue')) {

                    obj.text = item[this.targetObj.labelText]
                    obj.value = item[this.targetObj.labelValue]
                    obj.selected = item[this.targetObj.isSelected]
                    console.log('item', obj);
                } else {
                    let response = Object.keys(item);
                    obj.text = response[0]
                    obj.value = response[1]
                }
                if (targetElementType == 'SELECT') {

                    $(targetElement).append($('<option>', obj));
                }
                else{
                    valArray.push(obj.value)

                }
            });
            if (valArray.length > 0) {
                $(targetElement).val(valArray.join(','))
            }
            $(targetElement).focus();
        }
    }
}