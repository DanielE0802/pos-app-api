CREATE TABLE e_money_credit.accounts (
  id integer NOT NULL,
  customer_id character varying NOT NULL,
  currency character varying NOT NULL,
  personal_bank_number character varying NOT NULL,
  personal_bank_currency character varying NOT NULL,
  personal_bank_type character varying NOT NULL,
  account_hash character varying,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp without time zone DEFAULT now() NOT NULL,
  updated_at timestamp without time zone DEFAULT now() NOT NULL,
  deleted_at timestamp without time zone
);