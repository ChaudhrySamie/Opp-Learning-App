// data/quizData.js
export const quizData = {
 classes: [
    {
      question: 'What is a class in OOP?',
      options: ['A blueprint for objects', 'A type of function', 'A variable container', 'None of these'],
      answer: 'A blueprint for objects',
    },
    {
      question: 'Which keyword is used to create a class in most languages?',
      options: ['object', 'function', 'class', 'struct'],
      answer: 'class',
    },
    {
      question: 'What do class members include?',
      options: ['Variables only', 'Functions only', 'Variables and functions', 'None'],
      answer: 'Variables and functions',
    },
    {
      question: 'What is the purpose of the public keyword in a class?',
      options: [
        'Hide members from outside',
        'Allow members to be accessed outside the class',
        'Make the class abstract',
        'Define a method',
      ],
      answer: 'Allow members to be accessed outside the class',
    },
    {
      question: 'Which of the following is true about a class?',
      options: [
        'A class can have attributes and methods',
        'A class is the same as an object',
        'A class cannot have functions',
        'None of the above',
      ],
      answer: 'A class can have attributes and methods',
    },
    {
      question: 'What is the correct way to end a class definition in C++?',
      options: ['With a period .', 'With a semicolon ;', 'With a comma ,', 'No ending required'],
      answer: 'With a semicolon ;',
    },
    {
      question: 'Classes are primarily used for:',
      options: ['Creating objects', 'Writing loops', 'Storing data in arrays', 'Running programs faster'],
      answer: 'Creating objects',
    },
    {
      question: 'A class is considered a:',
      options: ['Function', 'User-defined data type', 'Variable', 'Operator'],
      answer: 'User-defined data type',
    },
    {
      question: 'In real-life analogy, what does a class represent?',
      options: ['An object', 'A blueprint', 'A method', 'A variable'],
      answer: 'A blueprint',
    },
    {
      question: 'Can a class have multiple objects?',
      options: ['Yes', 'No', 'Only one object per class', 'Depends on language'],
      answer: 'Yes',
    },
  ],

  objects: [
    {
      question: 'What is an object in OOP?',
      options: ['A blueprint for classes', 'An instance of a class', 'A type of function', 'None of these'],
      answer: 'An instance of a class',
    },
    {
      question: 'How do you access attributes of an object?',
      options: ['Using @ symbol', 'Using . operator', 'Using & symbol', 'Directly without any operator'],
      answer: 'Using . operator',
    },
    {
      question: 'Can multiple objects be created from the same class?',
      options: ['Yes', 'No', 'Only if class is public', 'Only one object allowed'],
      answer: 'Yes',
    },
    {
      question: 'What does the dot (.) operator do?',
      options: [
        'Access class methods and attributes from object',
        'Define a class',
        'Create an object',
        'Terminate a program',
      ],
      answer: 'Access class methods and attributes from object',
    },
    {
      question: 'Which of the following is true about objects?',
      options: ['Objects are instances of classes', 'Objects are the same as classes', 'Objects cannot have attributes', 'Objects cannot have methods'],
      answer: 'Objects are instances of classes',
    },
    {
      question: 'What is required to create an object?',
      options: ['The class definition', 'A function', 'A variable', 'Nothing'],
      answer: 'The class definition',
    },
    {
      question: 'How do you assign values to object attributes?',
      options: ['Using dot operator', 'Using colon :', 'Using equals = in class', 'Directly in main'],
      answer: 'Using dot operator',
    },
    {
      question: 'Can different objects of the same class have different attribute values?',
      options: ['Yes', 'No', 'Only methods can differ', 'Depends on language'],
      answer: 'Yes',
    },
    {
      question: 'Which of the following can objects do?',
      options: ['Store values', 'Call methods', 'Both store values and call methods', 'Neither'],
      answer: 'Both store values and call methods',
    },
    {
      question: 'Objects are created using:',
      options: ['Class name followed by object name', 'Method name', 'Keyword object only', 'Interface'],
      answer: 'Class name followed by object name',
    },
  ],
 objects: [
  {
    question: 'An object is an instance of?',
    options: ['A function', 'A class', 'A variable', 'A loop'],
    answer: 'A class',
  },
  {
    question: 'Objects contain?',
    options: ['Data only', 'Methods only', 'Both data and methods', 'None of these'],
    answer: 'Both data and methods',
  },
  {
    question: 'How do you create an object in C++?',
    options: [
      'Using the class name followed by object name',
      'Using a function call',
      'Using a variable declaration only',
      'Using a loop'
    ],
    answer: 'Using the class name followed by object name',
  },
  {
    question: 'Which operator is used to access attributes of an object?',
    options: ['.', '::', '->', '+'],
    answer: '.',
  },
  {
    question: 'What will this code print?\nMyClass obj;\nobj.myNum = 10;\ncout << obj.myNum;',
    options: ['10', 'obj.myNum', 'Error', 'Nothing'],
    answer: '10',
  },
  {
    question: 'Can multiple objects of the same class exist independently?',
    options: ['Yes', 'No', 'Only one object can exist', 'Depends on the class'],
    answer: 'Yes',
  },
  {
    question: 'What is required before creating an object?',
    options: [
      'Defining a class',
      'Defining a function',
      'Initializing a variable',
      'Nothing is required'
    ],
    answer: 'Defining a class',
  },
  {
    question: 'Can objects access methods of their class?',
    options: ['Yes', 'No', 'Only if public', 'Only if private'],
    answer: 'Yes',
  },
  {
    question: 'What is the output of this snippet?\nCar carObj1;\ncarObj1.brand = "BMW";\ncout << carObj1.brand;',
    options: ['BMW', 'brand', 'Error', 'None'],
    answer: 'BMW',
  },
  {
    question: 'Challenge: If you create two objects of the same class, can you assign different values to each?',
    options: ['Yes', 'No', 'Only one value for all objects', 'Depends on the class'],
    answer: 'Yes',
  },
],
methods: [
  {
    question: 'What is a method in a class?',
    options: [
      'A function that belongs to the class',
      'A variable in the class',
      'A type of object',
      'A loop inside the class'
    ],
    answer: 'A function that belongs to the class',
  },
  {
    question: 'Why do we use methods in a class?',
    options: [
      'To define behavior of objects',
      'To store data only',
      'To create other classes',
      'To declare variables only'
    ],
    answer: 'To define behavior of objects',
  },
  {
    question: 'How do you call a method of a class?',
    options: [
      'Directly using class name',
      'Using object and dot (.) operator',
      'By writing function outside class only',
      'Methods cannot be called'
    ],
    answer: 'Using object and dot (.) operator',
  },
  {
    question: 'Where can methods be defined?',
    options: [
      'Inside the class only',
      'Outside the class only',
      'Inside or outside the class',
      'Methods are not defined'
    ],
    answer: 'Inside or outside the class',
  },
  {
    question: 'What is needed to call a method?',
    options: [
      'Class definition only',
      'An object of the class',
      'A global variable',
      'Nothing is needed'
    ],
    answer: 'An object of the class',
  },
  {
    question: 'What does the following method do?\nvoid myMethod() { cout << "Hello World!"; }',
    options: [
      'Prints "Hello World!"',
      'Creates an object',
      'Deletes a variable',
      'Starts a loop'
    ],
    answer: 'Prints "Hello World!"',
  },
  {
    question: 'Can multiple objects call the same method independently?',
    options: ['Yes', 'No', 'Only one object can', 'Depends on the method'],
    answer: 'Yes',
  },
  {
    question: 'What is the purpose of defining a method outside the class?',
    options: [
      'Better organization, especially in large programs',
      'Methods must be outside',
      'It makes them private',
      'It changes object values automatically'
    ],
    answer: 'Better organization, especially in large programs',
  },
  {
    question: 'Which symbol is used to define a method outside the class?',
    options: [
      ':: (scope resolution operator)',
      '. (dot operator)',
      '-> (arrow operator)',
      'No symbol needed'
    ],
    answer: ':: (scope resolution operator)',
  },
  {
    question: 'Challenge: What should the bark() method in Dog class print?',
    options: [
      '"Woof!"',
      '"Meow!"',
      '"Hello!"',
      '"Bark!"'
    ],
    answer: '"Woof!"',
  },
],

constructors: [
  {
    question: 'A constructor is?',
    options: [
      'Special function called when object is created',
      'A variable',
      'A loop',
      'A pointer'
    ],
    answer: 'Special function called when object is created',
  },
  {
    question: 'Constructor name must be?',
    options: [
      'Same as class name',
      'Different from class name',
      'Random',
      'Numeric'
    ],
    answer: 'Same as class name',
  },
  {
    question: 'What is the return type of a constructor?',
    options: ['None', 'int', 'void', 'Depends on class'],
    answer: 'None',
  },
  {
    question: 'When is a constructor called?',
    options: [
      'Automatically when an object is created',
      'Manually like a normal function',
      'During program compilation',
      'When memory is freed'
    ],
    answer: 'Automatically when an object is created',
  },
  {
    question: 'Constructors can take parameters?',
    options: ['Yes', 'No', 'Only in C++', 'Only in Java'],
    answer: 'Yes',
  },
  {
    question: 'Which access specifier is usually used for constructors?',
    options: ['public', 'private', 'protected', 'static'],
    answer: 'public',
  },
  {
    question: 'Can multiple constructors exist in a class?',
    options: ['Yes, with different parameters', 'No, only one is allowed', 'Only if static', 'Only for abstract classes'],
    answer: 'Yes, with different parameters',
  },
  {
    question: 'What happens if no constructor is defined?',
    options: [
      'Compiler provides a default constructor',
      'Program will not compile',
      'Object cannot be created',
      'Memory error occurs'
    ],
    answer: 'Compiler provides a default constructor',
  },
  {
    question: 'Where can a constructor be defined?',
    options: ['Inside or outside the class', 'Only inside the class', 'Only outside the class', 'Nowhere'],
    answer: 'Inside or outside the class',
  },
  {
    question: 'Why are constructors useful?',
    options: [
      'They automatically initialize objects',
      'They delete objects',
      'They calculate memory usage',
      'They act as loops'
    ],
    answer: 'They automatically initialize objects',
  },
],
  inheritance: [
  {
    question: 'Inheritance allows a child class to acquire?',
    options: ['Properties and methods of parent class', 'Only properties', 'Only methods', 'Nothing'],
    answer: 'Properties and methods of parent class',
  },
  {
    question: 'The class being inherited from is called?',
    options: ['Child class', 'Derived class', 'Base class', 'Sub class'],
    answer: 'Base class',
  },
  {
    question: 'The class that inherits from another class is called?',
    options: ['Child class', 'Base class', 'Parent class', 'Super class'],
    answer: 'Child class',
  },
  {
    question: 'Which symbol is used for inheritance in C++?',
    options: ['#', '*', ':', '->'],
    answer: ':',
  },
  {
    question: 'Which type of inheritance allows a class to derive from more than one base class?',
    options: ['Single inheritance', 'Multilevel inheritance', 'Multiple inheritance', 'Hierarchical inheritance'],
    answer: 'Multiple inheritance',
  },
  {
    question: 'In multilevel inheritance, a class can be derived from?',
    options: [
      'Only one parent class',
      'Another derived class',
      'Multiple base classes at once',
      'No class'
    ],
    answer: 'Another derived class',
  },
  {
    question: 'Which access specifier allows members to be accessed in derived classes but not outside?',
    options: ['public', 'private', 'protected', 'static'],
    answer: 'protected',
  },
  {
    question: 'Can a derived class access private members of the base class directly?',
    options: ['Yes', 'No', 'Only in C++', 'Only if public'],
    answer: 'No',
  },
  {
    question: 'Why is inheritance useful?',
    options: [
      'Code reusability and cleaner structure',
      'Faster execution only',
      'Memory management',
      'Improves user interface'
    ],
    answer: 'Code reusability and cleaner structure',
  },
  {
    question: 'Which members are accessible everywhere in inheritance?',
    options: ['private', 'protected', 'public', 'friend'],
    answer: 'public',
  },
],
  polymorphism: [
  {
    question: 'Polymorphism allows?',
    options: [
      'Same function behaves differently',
      'Multiple classes with same name',
      'Different functions same name',
      'None'
    ],
    answer: 'Same function behaves differently',
  },
  {
    question: 'What does the word "Polymorphism" mean?',
    options: [
      'Many forms',
      'Single form',
      'Multiple variables',
      'Different classes'
    ],
    answer: 'Many forms',
  },
  {
    question: 'Polymorphism usually occurs with?',
    options: [
      'Inheritance',
      'Loops',
      'Pointers',
      'Arrays'
    ],
    answer: 'Inheritance',
  },
  {
    question: 'In the example, which class is the base class?',
    options: [
      'Animal',
      'Pig',
      'Dog',
      'Bird'
    ],
    answer: 'Animal',
  },
  {
    question: 'Pig and Dog classes are examples of?',
    options: [
      'Derived classes',
      'Base classes',
      'Functions',
      'Objects'
    ],
    answer: 'Derived classes',
  },
  {
    question: 'Which method is overridden in the derived classes?',
    options: [
      'animalSound()',
      'makeNoise()',
      'printSound()',
      'speak()'
    ],
    answer: 'animalSound()',
  },
  {
    question: 'What does method overriding demonstrate?',
    options: [
      'Polymorphism',
      'Encapsulation',
      'Abstraction',
      'Constructor'
    ],
    answer: 'Polymorphism',
  },
  {
    question: 'What will myPig.animalSound() print?',
    options: [
      'The pig says: wee wee',
      'The animal makes a sound',
      'The dog says: bow wow',
      'Nothing'
    ],
    answer: 'The pig says: wee wee',
  },
  {
    question: 'Why is polymorphism useful?',
    options: [
      'Code reusability and flexibility',
      'Faster loops',
      'Memory allocation',
      'Creating variables'
    ],
    answer: 'Code reusability and flexibility',
  },
  {
    question: 'Polymorphism allows one action to?',
    options: [
      'Behave differently depending on the object',
      'Run only once',
      'Create multiple variables',
      'Stop inheritance'
    ],
    answer: 'Behave differently depending on the object',
  }
],
  encapsulation: [
  {
    question: 'Encapsulation helps to?',
    options: ['Hide internal data', 'Increase code length', 'Duplicate data', 'None of these'],
    answer: 'Hide internal data',
  },
  {
    question: 'Encapsulation is mainly used for?',
    options: [
      'Data hiding and protection',
      'Creating loops',
      'Increasing memory usage',
      'Declaring variables'
    ],
    answer: 'Data hiding and protection',
  },
  {
    question: 'Which keyword is commonly used to hide data in a class?',
    options: ['private', 'public', 'protected', 'static'],
    answer: 'private',
  },
  {
    question: 'How can we access private attributes in encapsulation?',
    options: [
      'Using getter and setter methods',
      'Directly accessing the variable',
      'Using loops',
      'Using global variables'
    ],
    answer: 'Using getter and setter methods',
  },
  {
    question: 'What does a setter method do?',
    options: [
      'Assigns or updates a value',
      'Deletes a value',
      'Prints the class name',
      'Creates a loop'
    ],
    answer: 'Assigns or updates a value',
  },
  {
    question: 'What does a getter method do?',
    options: [
      'Returns the value of a private variable',
      'Deletes the variable',
      'Creates an object',
      'Stops program execution'
    ],
    answer: 'Returns the value of a private variable',
  },
  {
    question: 'In the example, what is the private attribute of Employee class?',
    options: ['salary', 'setSalary()', 'getSalary()', 'Employee'],
    answer: 'salary',
  },
  {
    question: 'Which method is used to set the salary in the example?',
    options: ['setSalary()', 'getSalary()', 'setValue()', 'updateSalary()'],
    answer: 'setSalary()',
  },
  {
    question: 'Which method is used to retrieve the salary?',
    options: ['getSalary()', 'setSalary()', 'printSalary()', 'showSalary()'],
    answer: 'getSalary()',
  },
  {
    question: 'Why is encapsulation important in OOP?',
    options: [
      'Improves security and code control',
      'Creates more variables',
      'Reduces code readability',
      'Only stores data'
    ],
    answer: 'Improves security and code control',
  }
],
  abstraction: [
  {
    question: 'Abstraction allows?',
    options: ['Hiding unnecessary details', 'Showing everything', 'Copying code', 'None'],
    answer: 'Hiding unnecessary details',
  },
  {
    question: 'What is the main purpose of abstraction in OOP?',
    options: [
      'Hide internal implementation',
      'Increase program size',
      'Duplicate code',
      'Remove classes'
    ],
    answer: 'Hide internal implementation',
  },
  {
    question: 'Abstraction in C# can be achieved using?',
    options: [
      'Abstract classes and interfaces',
      'Loops only',
      'Arrays only',
      'Pointers'
    ],
    answer: 'Abstract classes and interfaces',
  },
  {
    question: 'An abstract class can be?',
    options: [
      'Inherited by other classes',
      'Used directly to create objects',
      'Used as a loop',
      'Used as a variable'
    ],
    answer: 'Inherited by other classes',
  },
  {
    question: 'Can we create an object of an abstract class?',
    options: [
      'No',
      'Yes',
      'Only sometimes',
      'Only with pointers'
    ],
    answer: 'No',
  },
  {
    question: 'An abstract method?',
    options: [
      'Has no body',
      'Has a full body',
      'Is always private',
      'Is always static'
    ],
    answer: 'Has no body',
  },
  {
    question: 'Which keyword is used to define an abstract class?',
    options: [
      'abstract',
      'class',
      'void',
      'override'
    ],
    answer: 'abstract',
  },
  {
    question: 'Which keyword is used in a derived class to implement an abstract method?',
    options: [
      'override',
      'return',
      'static',
      'virtual'
    ],
    answer: 'override',
  },
  {
    question: 'In the example, which class inherits from Animal?',
    options: [
      'Pig',
      'Program',
      'Dog',
      'Main'
    ],
    answer: 'Pig',
  },
  {
    question: 'Which method in Animal class is a regular method?',
    options: [
      'sleep()',
      'animalSound()',
      'Main()',
      'override()'
    ],
    answer: 'sleep()',
  }
],
};