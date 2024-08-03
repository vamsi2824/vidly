import _ from 'lodash';

export function paginate(items,pageNumber,pazeSize) {
const startIndex =(pageNumber-1)*pazeSize;
return _(items).slice(startIndex).take(pazeSize).value();
}