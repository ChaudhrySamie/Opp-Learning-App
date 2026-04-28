// data/oopConcepts.js

export const oopConcepts = [
  {
    id: "classes",
    title: "Classes (The Blueprint)",

    content:
      "Imagine you are an architect. Before a house is built, you draw a detailed blueprint. A **Class** in Object-Oriented Programming (OOP) is exactly that: a blueprint or a template for creating objects.\n\nIt groups together two main things:\n- **Data (Attributes):** The characteristics of the object (e.g., the color of the house, number of doors).\n- **Functions (Methods):** The actions the object can perform (e.g., opening the door, turning on the lights).\n\nWhen you define a class, you are just defining the ideas. No actual memory or physical house is created yet—it just tells the computer *how* an object should look and behave.",

    codeExample: `// 1. Defining the Blueprint (Class)
class Car {
public: // This means anyone can access these attributes
  string brand;   // Attribute (Data)
  string model;   // Attribute (Data)
  int year;       // Attribute (Data)
};`,

    extraExplanation:
      "In the code above, the `class` keyword tells the computer we are making a blueprint named `Car`.\nInside it, we define attributes like `brand`, `model`, and `year`. The `public:` keyword is an access specifier that acts like an open door; it allows these attributes to be accessed and modified from outside the class.",

    challenge: `🚀 Your Turn:\nCreate a class called 'Superhero' with these public attributes:\n- name (string)\n- powerLevel (int)\n- catchphrase (string)`,

    usefulness: "Classes make your code organized and modular. Instead of having dozens of random variables scattered everywhere, you logically group related data together."
  },

  {
    id: "objects",
    title: "Objects (The Physical Reality)",

    content:
      "If a Class is the blueprint, an **Object** is the actual physical house built from that blueprint. This process is called **Instantiation** (creating an instance).\n\nYou can use one single blueprint (Class) to build as many houses (Objects) as you want. Each house will have its own specific details—one might have a red door, another a blue door—but they all follow the same structured design.",

    codeExample: `class Car {
public:
  string brand;
  string model;
};

int main() {
  // 2. Building the actual objects from the blueprint
  Car myFirstCar; 
  Car mySecondCar;

  // 3. Giving specific details to each object using the dot (.) operator
  myFirstCar.brand = "Toyota";
  myFirstCar.model = "Corolla";

  mySecondCar.brand = "Ford";
  mySecondCar.model = "Mustang";

  cout << myFirstCar.brand << " " << myFirstCar.model << endl;
  cout << mySecondCar.brand << " " << mySecondCar.model << endl;

  return 0;
}`,

    extraExplanation:
      "To create an object, you simply write the Class name followed by whatever you want to name your object (e.g., `Car myFirstCar;`).\nTo access or modify the object's attributes, you use the 'dot operator' (`.`). For example, `myFirstCar.brand` translates to \"myFirstCar's brand\".",

    multipleObjectsExample: `class Student {
public:
  string name;
  string major;
};

int main() {
  Student student1;
  student1.name = "Alice";
  student1.major = "Computer Science";

  Student student2;
  student2.name = "Bob";
  student2.major = "Mathematics";

  cout << student1.name << " studies " << student1.major << endl;
  cout << student2.name << " studies " << student2.major << endl;

  return 0;
}`,

    challenge: `🚀 Your Turn:\nUsing the 'Superhero' class from the previous challenge, create two superhero objects: 'batman' and 'superman'.\nAssign them different names, power levels, and catchphrases, then print them out!`,

    usefulness: "Objects allow you to work with real, tangible data items that perfectly follow the rules set by your class, enabling extreme reusability."
  },

  {
    id: "methods",
    title: "Class Methods (Actions & Behaviors)",

    content:
      "Attributes describe what an object *is*, but **Methods** describe what an object *does*.\n\nMethods are simply functions that are stored inside a class. They define the behavior of the objects created from that class. For example, if a `Dog` is our class, attributes might be `breed` and `age`, while methods might be `bark()`, `sit()`, or `fetch()`.",

    codeExample: `class Dog {
public:
  string name;

  // This is a method (a behavior of the Dog)
  void bark() {
    cout << name << " says: Woof! Woof!" << endl;
  }
};

int main() {
  Dog myDog;
  myDog.name = "Buddy";
  
  // Commanding the dog to perform the action
  myDog.bark(); 

  return 0;
}`,

    extraExplanation:
      "Methods have access to all the attributes within the same class. Notice how the `bark()` method uses the `name` attribute directly without it being passed as a parameter.\nYou can define methods directly inside the class (like the code example above) or declare them inside and define them completely outside the class using what we call the scope resolution operator (`::`).",

    multipleObjectsExample: `class Calculator {
public:
  int add(int a, int b); // Method declaration
};

// Method definition outside the class
int Calculator::add(int a, int b) {
  return a + b;
}

int main() {
  Calculator calc;
  cout << "Sum is: " << calc.add(5, 10);
  return 0;
}`,

    challenge: `🚀 Your Turn:\nAdd a method called 'usePower()' to your Superhero class that prints out their catchphrase and power level.\nThen, call this method on your 'batman' object.`,
    
    usefulness: "Methods keep objects self-contained. The object holds both its state (data) and its capabilities (functions), making complex software design much more intuitive, mimicking real-world logic."
  },

  {
    id: "constructors",
    title: "Constructors (The Setup Phase)",

    content:
      "Creating an object and manually setting every single attribute line-by-line using the dot operator can be exhausting.\n\nA **Constructor** provides a brilliant shortcut. It is a special method that gets called *automatically* the exact moment an object is created. Think of it like a factory machine that instantly sets up the item the second it rolls off the assembly line.",

    codeExample: `class Student {
public:
  string name;
  int grade;

  // The Constructor (Notice it has the exact same name as the Class!)
  Student(string studentName, int studentGrade) {
    name = studentName;
    grade = studentGrade;
    cout << "A new student named " << name << " has been enrolled!" << endl;
  }
};

int main() {
  // Creating the object and setting its attributes all in one step!
  Student s1("Alice", 90);
  Student s2("Bob", 85);

  return 0;
}`,

    extraExplanation:
      "Constructor Rules you must memorize:\n1. It must have the **exact same name** as the Class.\n2. It **does not have a return type** (not even `void`).\n3. It is automatically triggered upon object creation, making it perfect for initializing variables.",

    multipleObjectsExample: `class Car {
public:
  string brand;
  string model;
  
  // Parameterized Constructor
  Car(string b, string m) {
    brand = b;
    model = m;
  }
};

int main() {
  Car car1("Tesla", "Model 3");
  Car car2("Ford", "Mustang");
  return 0;
}`,

    outsideDefinitionExample: `class Student {
public:
  string name;
  // Constructor declaration
  Student(string studentName); 
};

// Constructor definition outside the class
Student::Student(string studentName) {
  name = studentName;
}

int main() {
  Student s1("Charlie");
  return 0;
}`,

    challenge: `🚀 Your Turn:\nAdd a constructor to the 'Superhero' class so that when you create a new superhero, you can pass their name, powerLevel, and catchphrase directly inside the parentheses.`,

    usefulness: "Constructors save massive amounts of time by drastically reducing the lines of code needed to setup objects. They also guarantee that an object starts its life in a valid, fully configured state, stopping bugs before they start."
  },

  {
    id: "inheritance",
    title: "Inheritance (Passing Down Traits)",

    content:
      "In real life, a child inherits traits (like eye color) from their parents. In OOP, **Inheritance** lets a new class (the Child) inherit the attributes and methods of an existing class (the Parent).\n\nThis solves a massive problem: huge amounts of code duplication. If you have a `Vehicle` class with a `startEngine()` method, and you want to create a `Car` and a `Motorcycle`, they can both simply inherit from `Vehicle` rather than rewriting `startEngine()` twice! This is called an \"IS-A\" relationship (A Car *is a* Vehicle).",

    codeExample: `// 1. The Parent (Base) Class
class Animal {
public:
  void eat() {
    cout << "Nom nom nom... I am eating!" << endl;
  }
};

// 2. The Child (Derived) Class inherits from Animal
class Cat : public Animal {
public:
  void meow() {
    cout << "Meow!" << endl;
  }
};

int main() {
  Cat myCat;
  
  myCat.meow();  // Method from the Cat class
  myCat.eat();   // Inherited method from the Animal class!

  return 0;
}`,

    extraExplanation:
      "By placing `: public Animal` after `class Cat`, the `Cat` class perfectly absorbs all the public attributes and methods of `Animal`.\n- Base Class: The parent being inherited from.\n- Derived Class: The child doing the inheriting.",

    multilevelExample: `// Multilevel Inheritance (Grandparent -> Parent -> Child)
class Electronic {
public: void turnOn() { cout << "Powering on..."; }
};

class Computer : public Electronic {
public: void bootOS() { cout << "Booting Windows..."; }
};

class Laptop : public Computer {
public: void foldScreen() { cout << "Screen folded."; }
};

int main() {
  Laptop myLaptop;
  myLaptop.turnOn(); // Inherited from Electronic
  myLaptop.bootOS(); // Inherited from Computer
  myLaptop.foldScreen(); // Specific to Laptop
  return 0;
}`,

    multipleInheritanceExample: `// Multiple Inheritance (A child with two distinct parents)
class Camera {
public: void takePhoto() { cout << "Snap!"; }
};

class Phone {
public: void makeCall() { cout << "Ring ring!"; }
};

// Smartphone inherits from BOTH Camera and Phone
class Smartphone : public Camera, public Phone {};

int main() {
  Smartphone myPhone;
  myPhone.takePhoto();
  myPhone.makeCall();
  return 0;
}`,

    accessSpecifiersExample: `// Protected Access Specifier
class Employee {
protected: 
  // Protected means ONLY this class and its descendants (children) can access it!
  int salary; 
};

class Manager : public Employee {
public:
  void setSalary(int s) { 
    salary = s; // Allowed because Manager is a child of Employee
  }
  int getSalary() { return salary; }
};`,

    challenge: `🚀 Your Turn:\nCreate a base class 'Shape' with a method 'printColor()'. Then, create a derived class 'Circle' that inherits from 'Shape' and adds its own specific method 'calculateArea()'.`,

    usefulness: "Inheritance champions the famous software engineering DRY principle (Don't Repeat Yourself). It establishes logical, structured hierarchies that make expanding your applications incredibly simple and intuitive."
  },

  {
    id: "polymorphism",
    title: "Polymorphism (Many Forms)",
    
    content: "The word **Polymorphism** translates to \"many forms\". In OOP, it means that inherited classes can override or fundamentally change the default behaviors they inherited from their parent class.\n\nImagine a parent class `Animal` with a method `makeSound()`. If a `Dog` and a `Cat` inherit from `Animal`, they can't both make the exact same generic sound! Polymorphism allows the `Dog` class to redefine `makeSound()` as \"Woof\" and the `Cat` class to redefine it as \"Meow\". We have one method name, but many different forms of output.",
    
    codeExample: `class Animal {
public:
  // adding 'virtual' allows child classes to override this method beautifully
  virtual void makeSound() {
    cout << "Some generic animal sound..." << endl;
  }
};

class Pig : public Animal {
public:
  // Overriding the parent's method with a specific implementation
  void makeSound() override {
    cout << "The pig says: Oink Oink!" << endl;
  }
};

class Dog : public Animal {
public:
  // Overriding the parent's method with a specific implementation
  void makeSound() override {
    cout << "The dog says: Woof Woof!" << endl;
  }
};

int main() {
  Animal genericAnimal;
  Pig myPig;
  Dog myDog;

  genericAnimal.makeSound(); // Outputs generic sound
  myPig.makeSound();         // Outputs Oink
  myDog.makeSound();         // Outputs Woof
  return 0;
}`,
    
    extraExplanation: "In C++, achieving proper polymorphism often involves placing the `virtual` keyword inside the parent class method and the `override` keyword in the child class method. This firmly tells the compiler: 'Hey, if this is a Dog, ignore the Animal's baseline version of this method and exclusively use the Dog's localized version instead.'",
    
    challenge: `🚀 Your Turn:\nCreate a base class 'Vehicle' with a method 'startEngine()'. Then create 'Car' and 'Motorcycle' classes that inherit from 'Vehicle'. Override the 'startEngine()' method so the Car goes 'Vroom Vroom' and the Motorcycle goes 'Rev Rev'.`,
    
    usefulness: "Polymorphism massively enhances flexibility. It allows you to treat a vast collection of different child objects securely and identically to their parent. You can seamlessly loop through a list of a hundred different 'Animals' and uniformly instruct each to `makeSound()`. Every unique animal will know exactly which specific sound to make, without any grueling switch/if-else logic needed from you!"
  },

  {
    id: "encapsulation",
    title: "Encapsulation (The Protective Shield)",
    
    content: "**Encapsulation** means \"hiding sensitive data\" from the outside world. It acts precisely like a protective vault or shield wrapped around your class's attributes.\n\nThink of a capsule pill: the precious medicine is securely contained inside the tough outer shell. In OOP, we aggressively make our sensitive attributes `private` so that no erratic external code can accidentally or maliciously change them. To allow strictly safe modifications, we provide highly controlled public `getter` and `setter` methods.",
    
    codeExample: `class BankAccount {
private:
  // Hidden data (The vault)! External code cannot ever touch this directly.
  double balance;

public:
  // Constructor to initiate the account securely
  BankAccount() {
    balance = 0.0;
  }

  // SETTER: A flawlessly controlled way to add money
  void deposit(double amount) {
    if (amount > 0) {
      balance += amount;
      cout << "Deposited: $" << amount << endl;
    } else {
      cout << "Error: Cannot deposit negative or zero money!" << endl;
    }
  }

  // GETTER: A flawlessly controlled safely read-only way to view the balance
  double getBalance() {
    return balance;
  }
};

int main() {
  BankAccount myAccount;
  
  // myAccount.balance = 1000000;  <- ERROR! The balance is private! The compiler physically denies this!
  
  myAccount.deposit(50);
  cout << "Current Balance: $" << myAccount.getBalance() << endl;
  
  return 0;
}`,
    
    extraExplanation: "Notice intimately how the `deposit` setter method contains a crucial `if` statement safeguard. Because the balance is entirely private, external users are categorically forced to go through the `deposit` method pathway to alter the true balance. This comprehensively ensures no one can inject a negative amount and shatter the system logic. This airtight control mechanism is exactly what Encapsulation provides.",
    
    challenge: `🚀 Your Turn:\nCreate a class 'User' deeply encapsulated with a private 'password' attribute.\nDevelop a public setter method 'setPassword(string newPassword)' that validates and exclusively updates the password ONLY if its size length is strictly greater than 6 characters.`,
    
    usefulness: "Encapsulation is a fundamental pillar of data security and integrity. By forcing rogue programmers (or even just yourself momentarily in the future) to exclusively interact via precise 'setter' and 'getter' gatekeepers, you flawlessly maintain absolute, unyielding control over the true state of your objects indefinitely."
  },

  {
    id: "abstraction",
    title: "Abstraction (Hiding the Complexity)",
    
    content: "**Abstraction** is the sophisticated process of utterly hiding the intricate, tangled underlying mechanics of a system and revealing solely the elegantly simple, essential features to the user.\n\nWhen you blissfully drive a car, you push the accelerator pedal to go faster. You emphatically do not need to understand the fiercely complex combustion engine fuel-injection firing sequence fiercely happening under the hood. The car provides a superbly simple interface (the pedal) and masterfully hides the complex reality (the engine). \n\nIn C++, Abstraction is supremely achieved using **Abstract Classes** wielding entirely pure virtual functions.",
    
    codeExample: `// Abstract Class (The uncompromising interface or contract)
class CoffeeMachine {
public:
  // Pure virtual function (note the mandatory '= 0'). 
  // It aggressively forces any surviving child class to fully implement this specific method.
  virtual void brewCoffee() = 0; 

  // Standard regular method alongside it
  void turnOn() {
    cout << "Machine powering up... warming the boiler." << endl;
  }
};

// Derived Fully-Fledged Class
class EspressoMachine : public CoffeeMachine {
public:
  // Must comprehensively provide the hidden complex physical implementation right here!
  void brewCoffee() override {
    cout << "1. Power grinding roasted beans..." << endl;
    cout << "2. Flash-heating isolated water to exact 90C..." << endl;
    cout << "3. Hydraulically pushing 9 full bars of pressure..." << endl;
    cout << "=> Enjoy your mathematically perfect Espresso!" << endl;
  }
};

int main() {
  // CoffeeMachine generic; <- FATAL ERROR! Cannot rudely instantiate a ghost abstract baseline class.
  
  EspressoMachine myMachine;
  myMachine.turnOn();
  myMachine.brewCoffee(); // The user just clicks ONE button, completely unaware of the raging complexity!
  
  return 0;
}`,
    
    extraExplanation: "Ironclad Rules for pure Abstraction:\n1. Any class featuring at least one solitary 'pure virtual function' (e.g., `virtual void func() = 0;`) instantly becomes a ghost **Abstract Class**.\n2. You **categorically cannot create objects** directly from an abstract class itself (it's physically incomplete mapping).\n3. Any child class **imperatively must** formulate the full bodies for all pure virtual functions, guaranteeing the sacred interface contract is permanently honored.",
    
    challenge: `🚀 Your Turn:\nConceive an abstract core class 'RemoteControl' featuring a pure virtual method 'pressButton()'.\nConstruct a derived tangible class 'TVRemote' that provides the specific, complex internal operational implementation of what chemically and electrically happens when the button is genuinely pressed.`,
    
    usefulness: "Abstraction relentlessly collapses crushing complexity for end-users of your code. By defining clean abstract exterior interfaces, you brilliantly separate *what* an object is broadly supposed to do strictly from *how* it algorithmically, specifically accomplishes it, making titanic, sprawling software systems radically highly scalable and effortlessly manageable."
  }
];