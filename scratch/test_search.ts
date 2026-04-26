
import { searchStocks } from '../lib/actions/finnhub.actions';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
    console.log('Testing searchStocks()...');
    const initial = await searchStocks();
    console.log('Initial stocks count:', initial.length);
    if (initial.length > 0) {
        console.log('First initial stock:', initial[0]);
    } else {
        console.log('Initial stocks is empty!');
    }

    console.log('\nTesting searchStocks("AAPL")...');
    const aapl = await searchStocks('AAPL');
    console.log('AAPL results count:', aapl.length);
    if (aapl.length > 0) {
        console.log('First AAPL result:', aapl[0]);
    }

    console.log('\nTesting searchStocks("NASDAQ")...');
    const nasdaq = await searchStocks('NASDAQ');
    console.log('NASDAQ results count:', nasdaq.length);
    if (nasdaq.length > 0) {
        console.log('First NASDAQ result:', nasdaq[0]);
    }
}

test().catch(console.error);
