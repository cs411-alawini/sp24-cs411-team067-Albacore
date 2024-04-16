# Create conda env
conda-env-create:
	conda env create -f conda.yml

conda-env-update:
	conda env update -f conda.yml

conda-activate:
	conda activate campus-cache

backend-run:
	uvicorn src.main:app --reload