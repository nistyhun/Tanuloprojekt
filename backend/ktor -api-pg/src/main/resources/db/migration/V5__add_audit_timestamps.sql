-- CATEGORIES
-- 1. Először nullable-ként hozzáadjuk
ALTER TABLE categories
    ADD COLUMN created_at TIMESTAMP NULL;

ALTER TABLE categories
    ADD COLUMN updated_at TIMESTAMP NULL;

-- 2. A meglévő rekordokat feltöltjük
UPDATE categories
SET created_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP;

-- 3. Most már lehet NOT NULL
ALTER TABLE categories
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE categories
    ALTER COLUMN updated_at SET NOT NULL;

-- 4. deleted_at eleve lehet NULL
ALTER TABLE categories
    ADD COLUMN deleted_at TIMESTAMP NULL;

-- ORDERS
ALTER TABLE orders
    ADD COLUMN created_at TIMESTAMP NULL;

ALTER TABLE orders
    ADD COLUMN updated_at TIMESTAMP NULL;

UPDATE orders
SET created_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP;

ALTER TABLE orders
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE orders
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE orders
    ADD COLUMN deleted_at TIMESTAMP NULL;

-- ROLES
ALTER TABLE roles
    ADD COLUMN created_at TIMESTAMP NULL;

ALTER TABLE roles
    ADD COLUMN updated_at TIMESTAMP NULL;

UPDATE roles
SET created_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP;

ALTER TABLE roles
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE roles
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE roles
    ADD COLUMN deleted_at TIMESTAMP NULL;

-- USERS
ALTER TABLE users
    ADD COLUMN updated_at TIMESTAMP NULL;

UPDATE users
SET updated_at = CURRENT_TIMESTAMP;

ALTER TABLE users
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE users
    ADD COLUMN deleted_at TIMESTAMP NULL;

ALTER TABLE users
    ALTER COLUMN created_at DROP DEFAULT;