INSERT INTO e_money_credit.accounts (id, customer_id, currency, personal_bank_number, personal_bank_currency, personal_bank_type, account_hash, is_active, created_at, updated_at, deleted_at) OVERRIDING SYSTEM VALUE VALUES
(1, '8776de18-d81e-11ef-9cd2-0242ac120002', 'GTQ', '7172670650', 'GTQ', 'MONETARIA', NULL, true, '2025-01-20 18:53:48.529197', '2025-01-20 18:53:48.529197', NULL);

INSERT INTO e_money_credit.fintechs (id, name, fintech_id, auth_id, is_active, onboarding_status, account_id, created_at, updated_at, deleted_at) OVERRIDING SYSTEM VALUE VALUES
(1, 'Fintech QA', '8776de18-d81e-11ef-9cd2-0242ac120002', 'hspoysEw4FWzG93Uo39piGQ7tj16sJ6P', true, '2', 1, '2025-01-08 18:53:48.529197', '2025-01-08 18:53:48.529197', NULL);
