import React from 'react';
type ListProps<T, K> = {
    items: T[],
    additionalData?: K,
    renderItem: (item: T, additionalData?: K,) => React.ReactNode
}
function ItemList<T, K = {}>(props: ListProps<T, K>) {
    const { items, renderItem, additionalData } = props
    return <ul style={{
        display: 'flex',
        flexWrap: 'wrap',

    }}>
        {
            items.map((item) => (
                <li 
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                    maxWidth: '400px',
                    minHeight: '300px',
                    overflow: 'hidden'
                }}>
                    {
                            renderItem(item, additionalData) 
                    }
                </li>

            ))
        }
    </ul>
};

export default ItemList;