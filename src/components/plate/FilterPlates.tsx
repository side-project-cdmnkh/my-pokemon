import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';
import useSelectedStore from '@/store/useSelectedStore';
import PlateHideButton from './PlateHideButton';
import { useState } from 'react';

const FilterPlates = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { selectedPlate, setSelectedPlate } = useSelectedStore();

  const renderTypes = (types: string[]) =>
    types.map((koreanType) => {
      const isPlateSelected = selectedPlate.includes(koreanType);
      const plateClassName = isPlateSelected
        ? styles.click_plate
        : styles.unclick_plate;

      return (
        <div
          onClick={() => {
            setSelectedPlate(koreanType);
          }}
          className={`${plateClassName} ${styles[koreanType]}`}
          key={koreanType}
          data-type={koreanType}
        >
          <img
            src={`/src/assets/icons/${koreanType}_${
              isPlateSelected ? 'off' : 'on'
            }.svg`}
            alt={`${koreanType}타입 아이콘`}
          />
          {isPlateSelected ? null : <span>{koreanType}</span>}
        </div>
      );
    });

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.type_container}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <span>*속성을 선택해주세요.</span>
        <div className={styles.type_plates}>{renderTypes(koreanTypes)}</div>
      </div>
      <PlateHideButton setIsOpen={setIsOpen} />
    </div>
  );
};

export default FilterPlates;
