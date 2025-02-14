# **DynamicFormUpdater**

This repository contains a `Test` class built using JavaScript and jQuery. The class is designed to dynamically bind event handlers (like `change`, `input`, `click`, etc.) to specified elements and process responses via AJAX requests. It allows you to dynamically populate select options or other form elements based on external data.

## **Features**

- Dynamically binds event handlers to DOM elements.
- Makes AJAX requests to a specified URL and processes the response.
- Updates DOM elements (such as `<select>` options) based on the AJAX response.
- Supports emptying select fields before adding new data.
- Automatically handles focus for the updated elements.

## **Class: `Test`**

### **Constructor**

```js
constructor(element, targetElementObj, events = "click")
```



### **Element:** 
The DOM element that triggers the event (e.g., #select1).

### **TargetElementObj:**
An object containing configuration for the target element, including:

- `element:` The target element to be updated.
- ```url:``` The URL to send the AJAX request to.
- ```requestParameters:``` An object containing request settings (optional).
- ```makeEmpty:``` Boolean to determine whether to empty the target element before adding new data (optional).
- ```labelText:``` The property from the response to use as the display text for options (optional).
- ```labelValue:``` The property from the response to use as the option's value (optional).
- ```data:``` A static array of data to be populated directly into the target element (optional).
- ```events:``` A string (or array of strings) representing the events that should trigger the handler (default: "click").
## **Methods**
``change()``
Handles the change event. If the targetObj has a data property, it calls addData() to update the target element. If the targetObj has a url property, it calls sendRequest() to perform an AJAX request and update the target element with the returned data.

``sendRequest()``
Makes an AJAX request to the specified URL (targetObj.url). The method expects a response to either directly populate the target element or to format it based on labelText and labelValue properties.

- Response handling:
  - If the response contains labelText and labelValue properties, the options are generated accordingly.
  - If the response has optionLabel and optionValue, it will use those to update the options.
  - Otherwise, it assumes the response is an array with objects, creating options from name and id.
``propertyExists(array, property)``
Checks if a property exists in any of the objects within the array. Returns ``true`` if the property exists in any object; otherwise, returns ``false``.

``addData(data)``
Populates the target element with the provided data. It can handle both array and object-based data:

- For `<select>` elements, it generates <option> elements.
- For other elements, it updates the value of the element (comma-separated if multiple values exist).
- Optionally empties the target element first based on makeEmpty.
## **Usage Example**
**Using Data**
```js 
let obj = new DynamicFormUpdater('#select1',
    {
        element: '#select2',
        labelText: "username",
        labelValue: "id",
        data: [
            { optionLabel: "A", optionValue: '1' },
            { optionLabel: "B", optionValue: '2', isSelected: true }
        ],
    },
    'change');
```
**Using URL**
```js
$(function () {
    let obj = new Test('#select1', {
        element: '#select2',
        url: 'https://jsonplaceholder.typicode.com/users',
        requestParameters: {
            method: "GET"
        },
        makeEmpty: true,
        labelText: "username",
        labelValue: "id",
    }, 'change');
});
```
In this example, an instance of the `Test` class is created, where:

- `#select1` is the triggering element.
- `#select2` is the target element to be updated.
- It fetches data from the given URL ``(https://jsonplaceholder.typicode.com/users)`` using the GET method.
- It empties the target element before appending the new data (as specified by `makeEmpty: true`).
- The `labelText` and `labelValue` properties are used to display `username` as the label and `id` as the value in the target select.
#
# **Events Supported**
The `Test` class can bind and respond to the following events:

- `change:` Triggered when the value of an input/select/checkbox changes.
- `input:` Triggered when the user types into an `<input>` element or changes the value of a `<textarea>`.
- `focus:` Triggered when the input/select/checkbox element gains focus.
- `blur:` Triggered when the input/select/checkbox element loses focus.
- `focusin:` Triggered when the input/select/checkbox element is focused (bubbles).
- `focusout:` Triggered when the input/select/checkbox element loses focus (bubbles).
- `select:` Triggered when a selection of text inside an `<input>` element is made.
- `click:` Triggered when a checkbox or radio button is clicked.
- `keydown:` Triggered when a key is pressed while the input element is focused.
- `keypress:` Triggered when a key is pressed and held while the input element is focused.
- `keyup:` Triggered when a key is released while the input element is focused.
#
# **Installation**
- Clone this repository:

```js
git clone https://github.com/yourusername/your-repository.git
```
- Include jQuery in your project:

```js
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```
- Include the JavaScript file containing the Test class in your project.

#

# **Contributing**
- Fork this repository.
- Create a new branch (``git checkout -b feature-branch``).
- Commit your changes (``git commit -am 'Add new feature'``).
- Push to the branch (``git push origin feature-branch``).
- Create a new Pull Request.
# **License**
This project is licensed under the MIT License - see the LICENSE.md file for details.


```
This markdown code will be properly formatted once you paste it into your `README.md` file in your project repository.

Let me know if you need anything else!
```
