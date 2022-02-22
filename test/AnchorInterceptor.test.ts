import { AnchorInterceptor } from '../src/AnchorInterceptor';

test(
    'constructor',
    () => {
        const a = new AnchorInterceptor(
            '',
            [
                'smoothScrollThis',
                'js-smooth-scroll',
            ]
        );

        expect(a).toBeInstanceOf(AnchorInterceptor);
    }
);