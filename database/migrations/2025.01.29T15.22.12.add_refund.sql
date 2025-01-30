ALTER TABLE e_money_credit.transactions
ADD COLUMN refund_id character varying,
ADD COLUMN refund_at timestamp without time zone;