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


    Solr

    TODO STIPE PD

        in order to setup the solrconfig.xml for mlt query:

            curl -X POST -H "Content-Type: application/json" \
            http://localhost:8983/solr/pokemon/config \
            -d '{
            "add-requesthandler": {
                "name": "/mlt",
                "class": "solr.MoreLikeThisHandler",
                "defaults": {
                "mlt.fl": "Description,type1,type2,name,evolution_line",
                "mlt.mintf": 2,
                "mlt.mindf": 1,
                "mlt.boost": "true",
                "mlt.count": 10
                }
            }
            }'

            check if it works by running:
                curl http://localhost:8983/solr/pokemon/config/requestHandler

            and:
                curl "http://localhost:8983/solr/pokemon/mlt?q=id:3&mlt.fl=Description,type1,type2,name,evolution_line&rows=5"
