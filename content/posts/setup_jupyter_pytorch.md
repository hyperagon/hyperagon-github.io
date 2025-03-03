+++
title = "Jupyter plus PyTorch Setup"
summary = "How to set Jupyter Notebook and PyTorch up"
date = 2025-01-25T08:10:34+01:00
draft = false
tags = ['jupyter notebook', 'pytorch']
+++
So I've been watching [Andrej Karpathy's](https://www.youtube.com/@AndrejKarpathy) videos and he makes good use of [Jupyter Notebook](https://jupyter.org/) and [PyTorch](https://pytorch.org/).

I decided to make a post on how to install both of these in a [Python](https://www.python.org/downloads/) environment.
To start off we make said environment.
`python -m venv env`

Then just adtivate it and install everything.
```
source env/bin/activate
pip install --upgrade pip
pip install --upgrade ipython jupyter
pip install --upgrade torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```
You can get the commands from the [Jupyter Lab website](https://jupyter.org/install) and [PyTorch website](https://pytorch.org/get-started/locally/), respectively.
I added the --upgrade to future-proof it.

Now just make a bash script to run it.
```
#!/bin/bash
source env/bin/activate
jupyter notebook
```
And it's ready to use. Do make sure that you are editing **.ipynb** files or you'll get a basic text-editor, it happened to me when editing a **.py** file.

Note that this is folder-specific so don't rename it.
