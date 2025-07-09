$env:FLASK_APP = "src.app"
$env:FLASK_DEBUG = "1"
$env:PYTHONPATH="src"
pipenv run flask run 