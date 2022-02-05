import styles from './InfoRow.module.css';

interface InfoRowProps {
  title: string;
  content: string | JSX.Element[];
}

const InfoRow = ({ title, content }: InfoRowProps) => {
  return (
    <div className={styles.details_panel_row}>
      <div className={styles.details_panel_label}>{title}</div>
      <div className={styles.details_panel_value}>{content}</div>
    </div>
  );
};

export default InfoRow;
