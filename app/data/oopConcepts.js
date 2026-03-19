// data/oopConcepts.js

export const oopConcepts = [
  {
    id: "classes",
    title: "Classes",

    content:
      "A class is a user-defined data type in C++ that acts as a blueprint for creating objects. It groups data (attributes) and functions (methods) into a single unit, defining the properties and behaviors of objects. Memory is allocated only when objects are created, and each object has its own data while sharing the same methods. Classes help organize, reuse, and manage code efficiently.",

    codeExample: `// Create a class
class MyClass {
public:
  int myNum;        // Attribute
  string myString;  // Attribute
};`,

    extraExplanation:
      "The class keyword is used to define a class in C++, which serves as a blueprint for creating objects. Inside the class, we declare variables and functions known as class members. In this example, myNum and myString are attributes that store data. The public keyword is an access specifier that makes these members accessible from outside the class, meaning they can be used directly through objects of the class. This structure helps organize code by grouping related data and behavior into a single unit.",

    challenge: `Create a class called Book with these attributes:
- title (string)
- author (string)
- year (int)

Then create two objects and print their values.

Expected Output:
Matilda, Roald Dahl, 1988
The Giving Tree, Shel Silverstein, 1964`
  },

  {
    id: "objects",
    title: "Objects",

    content:
      "An object is an instance of a class. After creating a class, we can create objects from it. Objects allow us to access and use the attributes and methods defined in the class.",

    codeExample: `class MyClass {
public:
  int myNum;
  string myString;
};

int main() {
  MyClass myObj;

  myObj.myNum = 15;
  myObj.myString = "Some text";

  cout << myObj.myNum << endl;
  cout << myObj.myString;

  return 0;
}`,

    extraExplanation:
      "Objects are created using the class name followed by the object name. We access attributes using the dot (.) operator.",

    multipleObjectsExample: `class Car {
public:
  string brand;
  string model;
  int year;
};

int main() {

  Car carObj1;
  carObj1.brand = "BMW";
  carObj1.model = "X5";
  carObj1.year = 1999;

  Car carObj2;
  carObj2.brand = "Ford";
  carObj2.model = "Mustang";
  carObj2.year = 1969;

  cout << carObj1.brand << " " << carObj1.model << " " << carObj1.year << endl;
  cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << endl;

  return 0;
}`,

    challenge:
      "Create multiple objects from the same class and assign different values to each object."
  },
{
  id: "methods",
  title: "Class Methods",

  content:
    "Methods are functions that belong to a class. They define the behavior of objects created from that class. Methods allow objects to perform actions, just like functions in normal programming.",

  codeExample: `// Define a method inside the class
class MyClass {
public:
  void myMethod() {
    cout << "Hello World!";
  }
};

int main() {
  MyClass myObj;
  myObj.myMethod();   // Call the method
  return 0;
}`,

  extraExplanation:
    "You can define a method directly inside the class definition. To call the method, first create an object of the class and then use the dot (.) operator.",

  multipleObjectsExample: `// Define method outside the class
class MyClass {
public:
  void myMethod();   // Method declaration
};

void MyClass::myMethod() {
  cout << "Hello World!";
}

int main() {
  MyClass myObj;
  myObj.myMethod();   // Call the method
  return 0;
}`,

  challenge: `Create a class Dog with a method bark() that prints "Woof!".

Example Output:
Woof!`
},
{
  id: "constructors",
  title: "Constructors",

  content:
    "A constructor is a special method that is automatically called when an object of a class is created. Constructors are used to initialize object attributes and set up necessary initial values.",

  codeExample: `// Constructor inside the class
class MyClass {
public:
  MyClass() {   // Constructor
    cout << "Hello World!";
  }
};

int main() {
  MyClass myObj;  // Object creation calls constructor
  return 0;
}`,

  extraExplanation:
    "Constructor rules:\n- Name must be same as the class\n- No return type (not even void)\n- Usually declared public\n- Automatically called when object is created",

  multipleObjectsExample: `// Constructor with parameters
class Car {
public:
  string brand;
  string model;
  int year;
  Car(string x, string y, int z) {  // Constructor with parameters
    brand = x;
    model = y;
    year = z;
  }
};

int main() {
  Car carObj1("BMW", "X5", 1999);
  Car carObj2("Ford", "Mustang", 1969);

  cout << carObj1.brand << " " << carObj1.model << " " << carObj1.year << "\\n";
  cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << "\\n";
  return 0;
}`,

  outsideDefinitionExample: `// Constructor defined outside the class
class Car {
public:
  string brand;
  string model;
  int year;
  Car(string x, string y, int z); // Declaration
};

Car::Car(string x, string y, int z) { // Definition
  brand = x;
  model = y;
  year = z;
}

int main() {
  Car carObj1("BMW", "X5", 1999);
  Car carObj2("Ford", "Mustang", 1969);

  cout << carObj1.brand << " " << carObj1.model << " " << carObj1.year << "\\n";
  cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << "\\n";
  return 0;
}`,

  usefulness:
    "Constructors are useful because they automatically set up objects. Think of it like ordering a pizza: the constructor is the chef who prepares it perfectly before it reaches you."
},
  {
  id: "inheritance",
  title: "Inheritance",

  content:
    "Inheritance allows one class to reuse attributes and methods from another class. It helps you write cleaner, more efficient code by avoiding duplication. In C++, a derived class (child) inherits from a base class (parent).",

  codeExample: `// Base class
class Vehicle {
public:
  string brand = "Ford";
  void honk() {
    cout << "Tuut, tuut! \\n";
  }
};

// Derived class
class Car: public Vehicle {
public:
  string model = "Mustang";
};

int main() {
  Car myCar;
  myCar.honk();
  cout << myCar.brand + " " + myCar.model;
  return 0;
}`,

  extraExplanation:
    "Why and when to use inheritance:\n- Useful for code reusability: reuse attributes and methods of an existing class when creating a new class.\n- Can be single, multilevel, or multiple inheritance.",

  multilevelExample: `// Multilevel Inheritance
class MyClass {
public:
  void myFunction() { cout << "Some content in parent class."; }
};

class MyChild: public MyClass {
};

class MyGrandChild: public MyChild {
};

int main() {
  MyGrandChild myObj;
  myObj.myFunction();
  return 0;
}`,

  multipleInheritanceExample: `// Multiple Inheritance
class MyClass {
public:
  void myFunction() { cout << "Some content in parent class."; }
};

class MyOtherClass {
public:
  void myOtherFunction() { cout << "Some content in another class."; }
};

class MyChildClass: public MyClass, public MyOtherClass {
};

int main() {
  MyChildClass myObj;
  myObj.myFunction();
  myObj.myOtherFunction();
  return 0;
}`,

  accessSpecifiersExample: `// Access Specifiers Example
class Employee {
protected: // Protected access specifier
  int salary;
};

class Programmer: public Employee {
public:
  int bonus;
  void setSalary(int s) { salary = s; }
  int getSalary() { return salary; }
};

int main() {
  Programmer myObj;
  myObj.setSalary(50000);
  myObj.bonus = 15000;
  cout << "Salary: " << myObj.getSalary() << "\\n";
  cout << "Bonus: " << myObj.bonus << "\\n";
  return 0;
}`,

  usefulness:
    "Inheritance is essential for code reuse and structuring large programs. Public members are accessible everywhere, private members only in the class, and protected members in the class and its derived classes."
},

{
    id: 'polymorphism',
    title: 'Polymorphism',
    content: `Polymorphism means "many forms", and it occurs when we have many classes that are related to each other by inheritance.
It allows us to perform a single action in different ways.

For example, imagine a base class Animal with a method called makeSound(). Derived classes of Animals could be Pigs, Cats, Dogs, Birds, etc. Every animal can "make a sound", but each one sounds different:

Pig: wee wee
Dog: bow wow
Bird: tweet tweet
This is polymorphism - the same action behaves differently for each animal.`,
    codeExample: `// Base class
class Animal {
  public:
    void animalSound() {
      cout << "The animal makes a sound \\n";
    }
};

// Derived class
class Pig : public Animal {
  public:
    void animalSound() {
      cout << "The pig says: wee wee \\n";
    }
};

// Derived class
class Dog : public Animal {
  public:
    void animalSound() {
      cout << "The dog says: bow wow \\n";
    }
};

int main() {
  Animal myAnimal;
  Pig myPig;
  Dog myDog;

  myAnimal.animalSound();
  myPig.animalSound();
  myDog.animalSound();
  return 0;
}`,
    extraExplanation: `Remember that we use the : symbol to inherit from a class.  
Polymorphism uses inherited methods to perform different tasks, allowing flexibility and code reusability.`,
    challenge: `Create a base class Bird with a method fly(). Then create derived classes Parrot and Eagle. Override the fly() method so each bird "flies" differently. Test it in main().`,
    usefulness: `Polymorphism allows code reusability, flexibility, and cleaner code by performing the same action in multiple ways depending on the object.`,
  },
  // Add other topics here (classes, objects, methods, constructors, inheritance, etc.)

  

 {
  id: 'encapsulation',
  title: 'Encapsulation',
  content: `Encapsulation means "hiding sensitive data" to protect it from unauthorized access.  
In C++, you declare class attributes as private so they cannot be accessed directly from outside the class.  
To read or modify private attributes, you provide public "getter" and "setter" methods.

Real-Life Example:  
Think of an employee's salary:
- The salary is private — the employee can't change it directly  
- Only the manager can update it or share it appropriately  
Encapsulation works the same way: the data is hidden and only trusted methods can access or modify it.`,
  
  codeExample: `#include <iostream>
using namespace std;

class Employee {
  private:
    int salary; // Private attribute

  public:
    // Setter method
    void setSalary(int s) {
      salary = s;
    }
    // Getter method
    int getSalary() {
      return salary;
    }
};

int main() {
  Employee myObj;
  myObj.setSalary(50000);
  cout << myObj.getSalary();
  return 0;
}`,

  extraExplanation: `- Private attributes cannot be accessed directly  
- Use getter/setter methods to safely read or modify private data  
- Example: myObj.setSalary(50000) assigns the value, myObj.getSalary() reads it`,

  challenge: `Create a class BankAccount with a private attribute balance.  
Add methods deposit() and getBalance() to modify and read the balance. Test with an object of BankAccount.`,

  usefulness: `Encapsulation improves data security, ensures better control of your code, and allows you to modify parts of your program without affecting other parts. It is considered a best practice in OOP.`,
},

 {
  id: 'abstraction',
  title: 'Abstraction',
  content: `Data abstraction is the process of hiding certain details and showing only essential information to the user.  
In C#, abstraction can be achieved using abstract classes or interfaces.  

- Abstract class: cannot be instantiated directly; it must be inherited by a derived class  
- Abstract method: declared without a body in an abstract class; the derived class must provide the body  

An abstract class can also have regular methods that can be used by derived classes.`,

  codeExample: `using System;

abstract class Animal
{
    // Abstract method (no body)
    public abstract void animalSound();
    
    // Regular method
    public void sleep()
    {
        Console.WriteLine("Zzz");
    }
}

// Derived class
class Pig : Animal
{
    public override void animalSound()
    {
        Console.WriteLine("The pig says: wee wee");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Pig myPig = new Pig(); // Create a Pig object
        myPig.animalSound();   // Call the abstract method
        myPig.sleep();         // Call the regular method
    }
}`,

  extraExplanation: `- You cannot create an object of an abstract class directly  
- Use the : symbol to inherit from an abstract class  
- Use override in the derived class to implement the abstract method  
- Regular methods in the abstract class can be used directly by derived class objects`,

  challenge: `Create an abstract class Vehicle with an abstract method move() and a regular method fuelType().  
Then create a derived class Car that implements move() and uses fuelType(). Test with an object of Car.`,

  usefulness: `Abstraction hides unnecessary details and exposes only essential features, increasing security and simplifying the interface for users. It also promotes code reusability and cleaner architecture in OOP.`
}
];