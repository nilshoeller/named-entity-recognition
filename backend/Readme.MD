# README

Only for local setup without docker.

#### Setup and start virtual env

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

#### Freeze requirements when making changes

```bash
- pip freeze > requirements.txt
```

##### Download language set

```bash
python -m spacy download en_core_web_sm
```

```bash
python -m spacy download de_core_news_sm
```
