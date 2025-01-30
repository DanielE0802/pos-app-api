CREATE TABLE e_money_credit.transactions (
  id integer NOT NULL,
  transfer_id character varying NOT NULL,
  transfer_timestamp timestamp without time zone NOT NULL,
  amount integer NOT NULL,
  authorization_code character varying NOT NULL,
  description character varying NOT NULL,
  status integer NOT NULL,
  sender_customer_id character varying,
  debit_account_number character varying NOT NULL,
  debit_owner_name character varying,
  receiver_customer_id character varying,
  credit_account_number character varying NOT NULL,
  credit_owner_name character varying,
  created_at timestamp without time zone DEFAULT now() NOT NULL
);