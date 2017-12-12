#React Play 2
Lynda Learning React.js.

##NOTES
- Add elements:
    - "React.createElement('elem', null, 'item')"
        - 'item' can be another React.createElement()
        - [React.createElement(component, props, ...children)](https://reactjs.org/docs/jsx-in-depth.html#___gatsby)
        - use 'className' instead of 'class' when setting styles in React (ES6 keyword conflict).
    - When using JSX and Babel, script tag must be of type="text/babel".
        - Using JSX transpiles down "React.createElement()"
        
    - Think of elements as "Components".
        - Naming convention: "MyComponent", pascal case.
        - MyComponent is an instance of React.createClass();
        - Each class has a render() method to let React know what to render.
        - (NOTE: createClass() does not work anymore. Use ES6 syntax)
    
    - Ways to create components:
        - ES6 class.
        - stateless functional component.
            - "const MyComponent = () => {}"
    
    - Rendering multiple React components, wrap in DIV.
        - React 16 allows returning of an array of items, instead of wrapping in a div.
        
    - PROPS:
        - use "this.props.\<variable\>" to pull data straight from the DOM element.
        - use "this.props.children" to tell the component to render it's children.
        
    - Wrap returned divs in parenthesis.
    
## SVG
- [MDN: SVG Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    - "M x y" or "m dx dy"
        - upper case is absolute positioning, lower case is relative position.
        
        
## LINKS
- [Module: React-Draggable](https://mzabriskie.github.io/react-draggable/example/): Make React components draggable with this module.

## ReactJS.org tutorials
- [Functional and Class Components](https://reactjs.org/docs/components-and-props.html)


