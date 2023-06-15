import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Food } from '../interfaces/FoodInterface';

const url = 'http://localhost:8080/food';

interface FoodState {
    foods: Food[];
    selectedFood: Food | null;
    loading: boolean;
    error: any;
}

const initialState: FoodState = {
    foods: [],
    selectedFood: null,
    loading: false,
    error: 'asdasdasdasd'
};

export const findAllFoods = createAsyncThunk('foods/findAll', async () => {
    try {
        const response = await fetch(url);
        const data: Food[] = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const findFoodById = createAsyncThunk('foods/findById', async (id: string) => {
    try {
        const response = await fetch(`${url}/${id}`);
        const data: Food = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const addFood = createAsyncThunk('foods/add', async (food: Food) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: food.title,
                price: food.price,
                image: food.image
            })
        });
        const data: Food = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const updateFood = createAsyncThunk('foods/update', async (food: Food) => {
    try {
        const response = await fetch(`${url}/${food.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: food.title,
                price: food.price,
                image: food.image
            })
        });
        const data: Food = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const deleteFood = createAsyncThunk('foods/delete', async (id: string) => {
    try {
        const result = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        const data: string = await result.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const foodSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        emptyError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(findAllFoods.fulfilled, (state, action: PayloadAction<Food[]>) => {
                state.foods = action.payload;
            })
            .addCase(findFoodById.fulfilled, (state, action: PayloadAction<Food>) => {
                state.selectedFood = action.payload;
            })
            .addCase(addFood.fulfilled, (state, action: PayloadAction<Food>) => {
                state.foods.push(action.payload);
                window.location.href = '/';
            })
            .addCase(updateFood.fulfilled, (state, action: PayloadAction<Food>) => {
                const updatedFood = action.payload;
                const index = state.foods.findIndex(food => food.id === updatedFood.id);
                if (index !== -1) {
                    state.foods[index] = updatedFood;
                }
                window.location.href = '/';
            })
            .addCase(deleteFood.fulfilled, (state, action: PayloadAction<string>) => {
                const deletedFoodId = action.payload;
                state.foods = state.foods.filter(food => food.id !== deletedFoodId);
            })
            .addMatcher(
                action =>
                    [findAllFoods.pending, findFoodById.pending, addFood.pending, updateFood.pending, deleteFood.pending].includes(
                        action.type
                    ),
                state => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                action =>
                    [
                        findAllFoods.fulfilled,
                        findFoodById.fulfilled,
                        addFood.fulfilled,
                        updateFood.fulfilled,
                        deleteFood.fulfilled
                    ].includes(action.type),
                state => {
                    state.loading = false;
                }
            )
            .addMatcher(
                action =>
                    [findAllFoods.rejected, findFoodById.rejected, addFood.rejected, updateFood.rejected, deleteFood.rejected].includes(
                        action.type
                    ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    }
});

export const foodReducer = foodSlice.reducer;

export const { emptyError } = foodSlice.actions;
