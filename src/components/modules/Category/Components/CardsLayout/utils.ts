export const getCardSize = (index: number) => {
	const positionInRow = index % 2;
	const rowIndex = Math.floor(index / 2);
	if (rowIndex % 2 === 0) {
		return positionInRow === 0 ? "lg:col-span-2" : "lg:col-span-1";
	} else {
		return positionInRow === 0 ? "lg:col-span-1" : "lg:col-span-2";
	}
};
