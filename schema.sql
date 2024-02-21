CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    description TEXT,
    price NUMERIC(10, 2) -- Assuming price is stored as decimal
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    invoice_date DATE,
    total_amount NUMERIC(10, 2),
    status VARCHAR(20) -- Pending, Paid, etc.
);

CREATE TABLE invoice_items (
    item_id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES invoices(invoice_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    unit VARCHAR,
    price NUMERIC(10, 2),
    total NUMERIC(10, 2)
);