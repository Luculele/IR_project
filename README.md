PYTHON

    !!! IMPORTANT !!!:
        For each terminal you open you have to activate the environment


    Check which python you are using:
        run which python (or python3)
        if it returns something like: /path/to/your/project/env/bin/python3
            you are using the local environment
        if it return something like /usr/bin/python3
            you are using your global environment

    command to run the environment:
        # install the environment dir
        python3 -m venv env

        # run the environment:
        source env/bin/activate

        # return to global python:
        deactivate


    python extensions used:
        see requirements.txt
