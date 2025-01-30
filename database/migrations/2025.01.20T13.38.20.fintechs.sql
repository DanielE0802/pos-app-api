CREATE TABLE e_money_credit.fintechs (
  id integer NOT NULL,
  name character varying NOT NULL,
  fintech_id character varying,
  auth_id character varying NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  onboarding_status character varying DEFAULT '1' NOT NULL,
  account_id integer,
  created_at timestamp without time zone DEFAULT now() NOT NULL,
  updated_at timestamp without time zone DEFAULT now(),
  deleted_at timestamp without time zone
);