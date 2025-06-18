
# 📡 Python Socket.IO Server Example

This project is a real-time WebSocket server using Python's `socketio` library with support for:

* Sending plain messages
* Targeted messaging to a specific client
* Creating and joining rooms
* Sending messages to rooms
* Leaving rooms
* Deleting rooms (manual logic)

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DeveloperRejaul/python_chating_app.git
cd python_chating_app
```
### 2. setup python .vnnv
```bash
python -m venv .venv 
or 
python3 -m venv .venv 

source .venv/bin/activate # fro active

# check environment
which python
or 
which python3
```
### 3. install pipenv
```bash
pip install pipenv
```

### 4. install pipenv all package
```bash
pipenv install
```

### 5. Run Server

```bash
fastapi dev main.py --host 0.0.0.0 --port 8000
```

# Event Examples

This document provides examples of different event types and their content formats. These examples illustrate the structure of data you might encounter or need to send in a system that handles real-time communication or similar event-driven interactions.

## Event Types

Here are the examples of different event types:

### 1. message

**Content Type:** Text

**Example:**
This event represents a simple text message. The content is a plain string containing the message itself.

### 2. send

**Content Type:** JSON

**Example:**

```json
{
  "target_sid": "Ng5XNDXE_RFta7QHAAAD",
  "message": "Hello there!"
}
```


### 3. join_room

**Content Type:** JSON

**Example:**

```json
{ "room": "myroom1" }
```


### 4. message_to_room
**Content Type:** JSON

**Example:**

```json
{ "room": "myroom1", "message": "Hello Room!" }

```

### 5. leave_room
**Content Type:** JSON

**Example:**

```json
{ "room": "myroom1" }
```

### 6. leave_room
**Content Type:** JSON

**Example:**

```json
{ "room": "myroom1" }
```


# Setting Up and Running the Python Server (Optional)

This guide outlines the steps to set up and run the Python server using Python 3.12, pipenv for dependency management based on the provided `Pipfile`, and a virtual environment. It also includes recommendations for Visual Studio Code (VS Code) and Python extensions to enhance your development experience.

## Prerequisites

* **Python 3.12:** Ensure you have Python 3.12 installed on your system. You can check your Python version by running:
    ```bash
    python3 --version
    ```
    If you don't have Python 3.12, you'll need to install it.
* **pipenv:** If you don't have pipenv installed, you can install it using pip:
    ```bash
    pip install pipenv
    ```

## Setup Instructions

1.  **Navigate to the Project Directory:** Open your terminal or command prompt and navigate to the root directory of your Python server project where the `Pipfile` is located.

2.  **Install Dependencies using Pipenv:** Pipenv will automatically create and manage the virtual environment based on the `Pipfile`. Run the following command to install the specified packages (FastAPI with the "standard" extras and python-socketio):
    ```bash
    pipenv install --dev
    ```
    The `--dev` flag ensures that both production and development dependencies (if any were listed in `[dev-packages]`) are installed. In your provided `Pipfile`, there are no development dependencies, so this will install `fastapi` and `python-socketio`.

3.  **Activate the Virtual Environment:** Before running your server, activate the pipenv virtual environment:
    ```bash
    pipenv shell
    ```
    Your terminal prompt should now be prefixed with the name of your virtual environment (e.g., `(your-project-name)`). This indicates that the environment is active and any Python commands will use the packages installed within it.

4.  **Run the Python Server:** Once the virtual environment is activated and your dependencies are installed, you can run your Python server script (replace `main.py` or `app.py` with the actual name of your main server file). Assuming your main file is named `main.py`:
    ```bash
    python main.py
    ```
    or if your script has execute permissions:
    ```bash
    ./main.py
    ```

## Visual Studio Code (VS Code) Integration

For a smooth development experience, it's recommended to use VS Code with the official Python extension.

1.  **Install VS Code:** If you haven't already, download and install Visual Studio Code from the official website: [https://code.visualstudio.com/](https://code.visualstudio.com/)

2.  **Install the Python Extension:**
    * Open VS Code.
    * Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
    * Search for "Python" and install the extension published by Microsoft.

3.  **Select the Python Interpreter:**
    * Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P).
    * Type "Python: Select Interpreter" and press Enter.
    * VS Code should automatically detect the Python interpreter associated with your pipenv environment. Select the one that corresponds to your project's virtual environment (it will likely show the path to the Python executable within the pipenv environment). This ensures that VS Code uses the correct Python version (3.12) and has access to your installed dependencies (FastAPI, python-socketio).

## Understanding `Pipfile`

The provided `Pipfile` specifies the dependencies for your project:

```toml
[[source]]
url = "[https://pypi.org/simple](https://pypi.org/simple)"
verify_ssl = true
name = "pypi"

[packages]
fastapi = {extras = ["standard"], version = "*"}
python-socketio = "*"

[dev-packages]

[requires]
python_version = "3.12"