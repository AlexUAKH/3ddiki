# admin
admin.dev:
	cd admin; make dev;

# api
api.dev:
	cd api; make dev;

gen:
	cd api; make gen;

migrate:
	cd api; make migrate;

studio:
	cd api; make studio;

seed:
	cd api; npm run seed;