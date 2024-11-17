DROP TABLE "public"."User";

CREATE SEQUENCE IF NOT EXISTS "User_id_seq";

-- Table Definition
CREATE TABLE "public"."User" (
    "id" int4 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."User" ("id","name","email","password") VALUES (1,'John Doe','test@gmail.com','$2a$12$j7X7gRMb2JA8Xf5cMahk5eBhzufy2a1ZXG.wDbs5BvHxcR7RnlRVm');

