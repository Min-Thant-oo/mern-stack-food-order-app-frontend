import type { MenuItem as MenuItemType } from "../../types";   // because of name conflict
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";

type Props = {
    menuItem: MenuItemType;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

const MenuItem = ({ menuItem, quantity, onIncrement, onDecrement }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <span className="font-bold">
                    ${(menuItem.price / 100).toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDecrement();
                        }}
                        disabled={quantity === 0}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onIncrement();
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default MenuItem;